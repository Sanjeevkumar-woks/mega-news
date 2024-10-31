const categories = [
  {
    id: 1,
    name: "business",
    image:
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGJ1c2luZXNzfGVufDB8fHx8MTY5MDE0MzYxMg&ixlib=rb-1.2.1&q=80&w=150",
  },

  {
    id: 2,
    name: "entertainment",
    image:
      "https://images.unsplash.com/photo-1541701494587-cb58502866ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDZ8fGVudGVydGFpbm1lbnR8ZW58MHx8fHwxNjkwMTQzNjQ3&ixlib=rb-1.2.1&q=80&w=150",
  },
  {
    id: 3,
    name: "environment",
    image:
      "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGVudmlyb25tZW50fGVufDB8fHx8MTY5MDE0MzY1MQ&ixlib=rb-1.2.1&q=80&w=150",
  },

  {
    id: 4,
    name: "lifestyle",
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDF8fGxpZmVzdHlsZXxlbnwwfHx8fDE2OTAxNDM2ODA&ixlib=rb-1.2.1&q=80&w=150",
  },
  ,
  {
    id: 5,
    name: "top",
    image:
      "https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDF8fHRvcHxlfDB8fHx8MTY5MDE0MzczNQ&ixlib=rb-1.2.1&q=80&w=150",
  },
  {
    id: 6,
    name: "tourism",
    image:
      "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDN8fHRvdXJpc218ZW58MHx8fHwxNjkwMTQzNzU3&ixlib=rb-1.2.1&q=80&w=150",
  },
  {
    id: 7,
    name: "world",
    image:
      "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDF8fHdvcmxkfGVufDB8fHx8MTY5MDE0Mzc2OQ&ixlib=rb-1.2.1&q=80&w=150",
  },
  {
    id: 8,
    name: "food",
    image:
      "https://images.unsplash.com/photo-1604908554162-56536c001231?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDF8fGZvb2R8ZW58MHx8fHwxNjkwMTQzNjYx&ixlib=rb-1.2.1&q=80&w=150",
  },
  {
    id: 9,
    name: "health",
    image:
      "https://images.unsplash.com/photo-1587502537745-91e7e12c04e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDF8fGhlYWx0aHxlbnwwfHx8fDE2OTAxNDM2NzE&ixlib=rb-1.2.1&q=80&w=150",
  },
  {
    id: 10,
    name: "politics",
    image:
      "https://images.unsplash.com/photo-1590073242673-b2491ced0f4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fHBvbGl0aWNzfGVufDB8fHx8MTY5MDE0MzY5Nw&ixlib=rb-1.2.1&q=80&w=150",
  },
  {
    id: 11,
    name: "science",
    image:
      "https://images.unsplash.com/photo-1581091870621-1fc6e5d673ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDF8fHNjaWVuY2V8ZW58MHx8fHwxNjkwMTQzNzE0&ixlib=rb-1.2.1&q=80&w=150",
  },
  {
    id: 12,
    name: "sports",
    image:
      "https://images.unsplash.com/photo-1605973376009-4f2fcdf5c7ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDF8fHNwb3J0c3xlbnwwfHx8fDE2OTAxNDM3MjY&ixlib=rb-1.2.1&q=80&w=150",
  },
  {
    id: 13,
    name: "technology",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fHRlY2hub2xvZ3l8ZW58MHx8fHwxNjkwMTQzNzM0&ixlib=rb-1.2.1&q=80&w=150",
  },
  {
    id: 14,
    name: "crime",
    image:
      "https://images.unsplash.com/photo-1531263729969-af908d6dbd47?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDF8fGNyaW1lfGVufDB8fHx8MTY5MDE0MzYyNA&ixlib=rb-1.2.1&q=80&w=150",
  },
  {
    id: 15,
    name: "domestic",
    image:
      "https://images.unsplash.com/photo-1560448204-e92f55e7b111?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGRvbWVzdGljfGVufDB8fHx8MTY5MDE0MzYyOQ&ixlib=rb-1.2.1&q=80&w=150",
  },
  {
    id: 16,
    name: "education",
    image:
      "https://images.unsplash.com/photo-1559757175-570327ff2c53?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGVkdWNhdGlvbnxlbnwwfHx8fDE2OTAxNDM2Mzc&ixlib=rb-1.2.1&q=80&w=150",
  },
  {
    id: 17,
    name: "other",
    image:
      "https://images.unsplash.com/photo-1532634993-15d4e2c90f79?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fHJhbmRvbXxlbnwwfHx8fDE2OTAxNDM3ODI&ixlib=rb-1.2.1&q=80&w=150",
  },
];

export default categories;
