const _ = require('lodash');
const { model } = require('mongoose');

const { transformMillisecondsToFormatDate } = require('./time.helper');
/**
 * Propagate duration update to ref model related with a local model
 *
 * @async
 * @param {String} local Model name that was evaluated into hook for example
 * @param {String} ref Parent model that you want to update with agregation sum
 * @param {String} localField local field with match ref model
 * @param {ObjectId|String} _id ObjectId or string represent ObjectId ref model you want update
 * @returns {Promise<Model|null>} model objec if was successfully or null if aggregation query was empty
 */
const PropageDurationUpdateParentModelAggregation = async (
  local,
  ref,
  localField,
  _id
) => {
  const query = await model(local).aggregate([
    { $match: { [localField]: _id } },
    {
      $project: {
        durationMilliseconds: { $ifNull: ['$durationMilliseconds', 0] }
      }
    },
    { $group: { _id: null, total: { $sum: '$durationMilliseconds' } } }
  ]);
  if (_.isArray(query) && !_.isEmpty(query)) {
    const { total } = query[0];
    const data = {
      durationMilliseconds: total,
      duration: await transformMillisecondsToFormatDate(total)
    };
    return model(ref).findByIdAndUpdate(_id, data, { runValidators: true });
  }
  return null;
};

module.exports = { PropageDurationUpdateParentModelAggregation };
