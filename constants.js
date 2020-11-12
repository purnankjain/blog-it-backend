const CONSTANTS = {
  DATABASE: {
    NAME: 'blogIt'
    , IMAGE_TABLE: {
      NAME: 'IMAGES'
      , COLUMNS: {
        ID: 'id'
        , NAME: 'name'
      }
    }
    , POSTS_TABLE: {
      NAME: 'POSTS'
      , COLUMNS: {
        ID: 'id'
        , TITLE: 'title'
        , CONTENT: 'content'
        , IMAGE: 'image_id'
      }
    }
  }
}

module.exports = CONSTANTS