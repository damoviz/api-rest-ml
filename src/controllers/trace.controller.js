const fetch = require("node-fetch")
const utils = require("../utils/functions")
const NodeCache = require("node-cache")// stats Model
const Stats = require("../db/models/Stats")

const myCache = new NodeCache({ stdTTL: 20 })

exports.trace = async (req, res) => {
  const { ip } = req.body

  if (!ip) {
    return res.status(400).json({
      error: 'required ip field'
    })
  }

  //161.185.160.93 USA
  //186.30.181.43  CO
  //210.138.184.59 TOKYO
  //190.152.109.178 ECU

  try {
    // settings IpApi
    const urlIpApi = 'http://api.ipapi.com/'
    const keyIpApi = '5ae1c1e5b0a82692bc8aa040ed878488'

    let jsonIpApi = ''

    // getting ipApi it from cache
    if (myCache.get(ip)) {
      jsonIpApi = myCache.get(ip)
    } else {
      const responseIpApi = await fetch(`${urlIpApi}${ip}?access_key=${keyIpApi}`)
      jsonIpApi = await responseIpApi.json()

      myCache.set(ip, jsonIpApi)
    }


    // getLanguages
    const languages = jsonIpApi.location.languages.map(val => val.native).toString()

    // getCurrency from utils functions
    const iso_code = jsonIpApi.country_code
    const currency = await utils.getCurrencyCountry(iso_code)

    // getGeoLocalisation
    const latitude = jsonIpApi.latitude.toString()
    const longitude = jsonIpApi.longitude.toString()

    const distance = Math.round(utils.getDistanceBetweenPoints(latitude, longitude) * 0.001)

    // endpoint result
    let data = {
      ip: ip,
      date: new Date().toISOString(),
      country: jsonIpApi.country_name,
      iso_code: iso_code,
      capital: jsonIpApi.location.capital,
      languages: languages,
      currency: currency,
      estimated_distance: distance + " km"
    }

    let setStats = []

    try {
      const stats = await Stats.find()

      // if stats.length > 0 stats existes then update , else insert
      if (stats.length > 0) {

        let idStats = 0
        let indextrace = 0
        let farthestRes = 0
        let closestRes = 0
        let traceArrayRes = []
        let setTraceArray = []
        let existTrace = false

        stats.map(val => {
          idStats = val._id
          farthestRes = val.farthest
          closestRes = val.closest
          traceArrayRes = val.trace
        })

        if (Array.isArray(traceArrayRes)) {
          traceArrayRes.map((val, i) => {
            if (iso_code === val.iso_code) {
              existTrace = true
              indextrace = i
              setTraceArray = {
                invocations: val.invocations + 1
              }
            } else {
              setTraceArray = {
                iso_code: iso_code,
                distance: distance,
                invocations: 1
              }
            }
          })
        }

        distance > farthestRes ? farthestRes = distance : farthestRes
        distance < closestRes ? closestRes = distance : closestRes

        setStats = {
          farthest: farthestRes,
          closest: closestRes
        }

        const updateStatsTrace = await Stats.findById(idStats)
        if (existTrace) {
          Object.assign(updateStatsTrace.trace[indextrace], setTraceArray)
        } else {
          updateStatsTrace.trace.push(setTraceArray)
        }

        await updateStatsTrace.save()

        await Stats.updateOne({ $set: setStats })

        res.status(200).send(JSON.stringify(data))
      } else {

        setStats = {
          farthest: distance,
          closest: distance,
          trace: {
            iso_code: iso_code,
            distance: distance,
            invocations: 1
          }
        }

        const newStats = new Stats(setStats)

        const statsAdd = await newStats.save()
        if (!statsAdd) throw Error(' Error save')
        res.status(200).send(JSON.stringify(data))
      }
    } catch (err) {
      res.status(400).json({ msg: err.message })
    }

  } catch (err) {
    res.status(500).json({ msg3: err.name })
  }

}