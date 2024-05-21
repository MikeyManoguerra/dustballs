//  add slug key to all docs

const conn = new Mongo();
const db = conn.getDB('dustball_db');

db.scenes.updateMany(
  {},
  [
    {
      $set: {
        "matches": {
          $regexFindAll: {
            input: "$title",
            regex: /([\w\s]+)/g
          }
        }
      }
    },
    {
      $set: {
        "slug": {
          $reduce: {
            input: "$matches.match", initialValue: "", in: {
              $concat: ["$$value", "$$this"]
            }
          }
        }
      },
    },
    {
      $set: {
        "matches": {
          $regexFindAll: {
            input: "$slug", regex: /([\w]+)/g
          }
        }
      }
    },
    {
      $set: {
        "slug": {
          $reduce: {
            input: "$matches.match", initialValue: "", in: {
              $concat: [
                "$$value",
                {
                  $cond: [{ $eq: ["$$value", ""] }, "", "-"]
                },
                "$$this"
              ]
            }
          }
        }
      },
    },
    {
      $unset: "matches"
    },
  ]
);

// Ex:
// input: { title : 'trees: a life without thumbs!' }
// result: {title: 'trees: a life without thumbs!', slug: 'trees-a-life-without-thumbs' }

db.collection.updateMany(
  {},
  [
    {
      $set: {
        "matches": { $regexFindAll: { input: "$title", regex: /([\w]+)/g } }
      }
    },
    {
      $set: {
        "slug": {
          $reduce: {
            input: "$matches.match",
            initialValue: "",
            in: { $concat: ["$$value", { $cond: [{ $eq: ["$$value", ""] }, "", "-"] }, "$$this"] }
          }
        }
      },
    },
    {
      $unset: "matches"
    },
  ]
);


const x = db.scenes.findOne(ObjectId('65c277300baea59b58c0aa97'))
printjson(x.slug)


