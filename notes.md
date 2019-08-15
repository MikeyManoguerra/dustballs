
What do I want to build:

  mongodb  database
  - has entire shakespeare discography
  - seperated into plays  acts  scenes
  - each work has some meta info, such as charcters, themes, synopsis
  - can add tags by user
  - each scene can have some sort of additional info section for links  and definitions
  

flask server
  - can return a random 'dustball' of information
  - dustball can be expanded for context 
  - handles filtering by tag, returns top results
  - can add tags
  - crowd sources definitions for translation

front end:
  - typescipt application
  

steps: get the plays
break them up into parts
what is the best way to store them?

potenttial data model:

{ 'act' : x ,
  'scene' : y ,
  ObjectId : gv3q4gq34h4q3h43qh43q3q,
  'title' : ' the good one',
  'type' : play
  'characters' (in scene) : [
    caesar,
    brutus,
  ] ,
  text: [
    {
      speaker: 'Brutus',
      lines : 'rome is not for monarchs',
      type : player
    },
      speaker : play (null),
      lines : 'exit stage',
      type : directions
    }
  ]
}