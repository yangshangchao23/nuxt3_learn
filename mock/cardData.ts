interface CardData {
  cmsType: string;
  // name: string;
  tableData: Array<any>;
}

export const formateData: CardData[] = [
  {
    cmsType: "fagui",
    // name: "法规",
    tableData: [
      {
        id: "1",
        title: "31青海省大气污染防治条例（2020修正）",
        docNum: "发文号001",
        publishDate: "2019-02-01",
      },
    ],
  },
  {
    cmsType: "dayi",
    // name: "答疑",
    tableData: [
      {
        id: "1",
        title: "31青海省大气污染防治条例（2020修正）",
        publishDate: "2019-02-01",
        type: "总局答疑",
        categoryTypes: "1",
      },
      {
        id: "12",
        title: "总局答疑2",
        publishDate: "2019-02-01",
        type: "总局答疑",
        categoryTypes: "1",
      },
      {
        id: "2",
        title: "各省答疑",
        publishDate: "2019-02-01",
        type: "各省答疑",
        categoryTypes: "2",
      },
    ],
  },
  {
    cmsType: "zhengce",
    // name: "政策",
    tableData: [
      {
        id: "1",
        title: "asdkflskad",
        publishDate: "2019-02-01",
        type: "总局政策",
        accessTypes: "public",
      },
      {
        id: "113",
        title: "各省政策2",
        publishDate: "2019-02-01",
        type: "各省政策",
        accessTypes: "private",
      },
      {
        id: "2",
        title: "各省政策",
        publishDate: "2019-02-01",
        type: "各省政策",
        accessTypes: "private",
      },
    ],
  },
];

export const originData = [
  {
    id: "1",
    title: "31青海省大气污染防治条例（2020修正）",
    docNum: "发文号001",
    publishDate: "2019-02-01",
    cmsType: "fagui",
  },
  {
    id: "d1",
    title: "31青海省大气污染防治条例（2020修正）",
    publishDate: "2019-02-01",
    type: "总局答疑",
    categoryTypes: "1",
    cmsType: "dayi",
  },
  {
    id: "d12",
    title: "总局答疑2",
    publishDate: "2019-02-01",
    type: "总局答疑",
    categoryTypes: "1",
    cmsType: "dayi",
  },
  {
    id: "d2",
    title: "各省答疑",
    publishDate: "2019-02-01",
    type: "各省答疑",
    categoryTypes: "2",
    cmsType: "dayi",
  },
  {
    id: "1",
    title: "asdkflskad",
    publishDate: "2019-02-01",
    type: "总局政策",
    accessTypes: "public",
    cmsType: "zhengce",
  },
  {
    id: "113",
    title: "各省政策2",
    publishDate: "2019-02-01",
    type: "各省政策",
    accessTypes: "private",
    cmsType: "zhengce",
  },
  {
    id: "2",
    title: "各省政策",
    publishDate: "2019-02-01",
    type: "各省政策",
    accessTypes: "private",
    cmsType: "zhengce",
  },
]