// stats Model
const Stats = require("../db/models/Stats")

exports.stats = async (req, res) => {

  try {
    const stats = await Stats.find()

    let farthestRes = 0
    let closestRes = 0
    let countAllDistance = 0
    let countAllInvocations = 0
    let traceArrayRes = []

    if (stats.length > 0) {
      stats.map(val => {
        traceArrayRes = val.trace
        farthestRes = val.farthest
        closestRes = val.closest
      })

      if (Array.isArray(traceArrayRes)) {
        traceArrayRes.map(val => {
          countAllDistance = countAllDistance + (val.distance * val.invocations)

          countAllInvocations = countAllInvocations + val.invocations
        })
      }

      const averageDistance = Math.round(countAllDistance / countAllInvocations)

      let data = {
        farthest_distance: farthestRes,
        closest_distance: closestRes,
        average_distance: averageDistance
      }

      res.status(200).send(data)
    } else {
      res.status(404).json({ msg: "No stats" })
    }
  } catch (err) {
    res.status(500).json({ msg: err.message })
  }

}