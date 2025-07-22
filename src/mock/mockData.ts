import type { CategoryTheme, Product, CardItem } from '@/types/index.ts';

// 실제 Mock 데이터

export const categories: CategoryTheme[] = [
  {
    themeId: 3715,
    name: '생일',
    image:
      'https://img1.daumcdn.net/thumb/S104x104/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fgift%2Fhome%2Ftheme%2F371520241125_LQBMT.png',
  },
  {
    themeId: 3714,
    name: '맛있는선물',
    image:
      'https://img1.daumcdn.net/thumb/S104x104/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fgift%2Fhome%2Ftheme%2F371420250401_CYHOR.png',
  },
  {
    themeId: 3713,
    name: '직장동료',
    image:
      'https://img1.daumcdn.net/thumb/S104x104/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fgift%2Fhome%2Ftheme%2F371320250107_QWGZN.png',
  },
  {
    themeId: 3712,
    name: '연인',
    image:
      'https://img1.daumcdn.net/thumb/S104x104/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fgift%2Fhome%2Ftheme%2F371220250107_YMYGC.png',
  },
  {
    themeId: 3993,
    name: 'FOR ME',
    image:
      'https://img1.daumcdn.net/thumb/S104x104/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fgift%2Fhome%2Ftheme%2F399320250519_CMTFF.png',
  },
  {
    themeId: 3710,
    name: '가벼운선물',
    image:
      'https://img1.daumcdn.net/thumb/S104x104/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fgift%2Fhome%2Ftheme%2F371020250102_QSNFV.png',
  },
  {
    themeId: 3782,
    name: '스몰럭셔리',
    image:
      'https://img1.daumcdn.net/thumb/S104x104/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fgift%2Fhome%2Ftheme%2F378220250214_OHAQK.png',
  },
  {
    themeId: 3877,
    name: '명품선물',
    image:
      'https://img1.daumcdn.net/thumb/S104x104/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fgift%2Fhome%2Ftheme%2F387720250324_SDCJQ.png',
  },
  {
    themeId: 3707,
    name: '출산・돌',
    image:
      'https://img1.daumcdn.net/thumb/S104x104/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fgift%2Fhome%2Ftheme%2F370720241228_QFZPM.png',
  },
  {
    themeId: 3697,
    name: '결혼・집들이',
    image:
      'https://img1.daumcdn.net/thumb/S104x104/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fgift%2Fhome%2Ftheme%2F369720250126_OGWLG.png',
  },
  {
    themeId: 3704,
    name: '시원한선물',
    image:
      'https://img1.daumcdn.net/thumb/S104x104/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fgift%2Fhome%2Ftheme%2F370420250324_WDMHS.png',
  },
  {
    themeId: 3705,
    name: '합격・응원',
    image:
      'https://img1.daumcdn.net/thumb/S104x104/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fgift%2Fhome%2Ftheme%2F370520250127_NLVFN.png',
  },
  {
    themeId: 3706,
    name: '건강・케어',
    image:
      'https://img1.daumcdn.net/thumb/S104x104/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fgift%2Fhome%2Ftheme%2F370620250415_HENTO.png',
  },
  {
    themeId: 3703,
    name: '교환권',
    image:
      'https://img1.daumcdn.net/thumb/S104x104/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fgift%2Fhome%2Ftheme%2F370320250331_NPPCU.png',
  },
  {
    themeId: 3702,
    name: '웃긴선물',
    image:
      'https://img1.daumcdn.net/thumb/S104x104/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fgift%2Fhome%2Ftheme%2F370220241228_UPSAE.png',
  },
];

const mockProduct: Product = {
  id: 123,
  name: 'BBQ 양념치킨+크림치즈볼+콜라1.25L',
  imageURL:
    'https://st.kakaocdn.net/product/gift/product/20231030175450_53e90ee9708f45ffa45b3f7b4bc01c7c.jpg',
  price: {
    basicPrice: 29000,
    discountRate: 0,
    sellingPrice: 29000,
  },
  brandInfo: {
    id: 2088,
    name: 'BBQ',
    imageURL:
      'https://st.kakaocdn.net/product/gift/gift_brand/20220216170226_38ba26d8eedf450683200d6730757204.png',
  },
};

// 랭킹용 상품들 (같은 상품을 여러 개로 복제)
export const products: Product[] = Array.from({ length: 12 }, (_, i) => ({
  ...mockProduct,
  id: mockProduct.id + i,
}));

const TAB_IDS = {
  ALL: 'ALL',
  FEMALE: 'FEMALE',
  MALE: 'MALE',
  TEEN: 'TEEN',
} as const;

const FILTER_IDS = {
  MANY_WISH: 'MANY_WISH',
  MANY_RECEIVE: 'MANY_RECEIVE',
  MANY_WISH_RECEIVE: 'MANY_WISH_RECEIVE',
} as const;

export const tabs = [
  { id: TAB_IDS.ALL, label: '전체', icon: 'ALL' },
  { id: TAB_IDS.FEMALE, label: '여성이', icon: '👩' },
  { id: TAB_IDS.MALE, label: '남성이', icon: '👨' },
  { id: TAB_IDS.TEEN, label: '청소년이', icon: '🧑' },
] as const;
export type Tab = (typeof tabs)[number];
export type TabId = Tab['id'];

export const filters = [
  { id: FILTER_IDS.MANY_WISH, label: '받고 싶어한' },
  { id: FILTER_IDS.MANY_RECEIVE, label: '많이 선물한' },
  { id: FILTER_IDS.MANY_WISH_RECEIVE, label: '위시로 받은' },
] as const;
export type Filter = (typeof filters)[number];
export type FilterId = Filter['id'];

export const cardData: CardItem[] = [
  {
    id: 904,
    thumbUrl: 'https://t1.daumcdn.net/gift/message-card/template/image/20240124_VGPJE.png',
    imageUrl: 'https://t1.daumcdn.net/gift/message-card/template/image/20240124_NRPQT.gif',
    defaultTextMessage: '축하해요.',
  },
  {
    id: 900,
    thumbUrl: 'https://t1.daumcdn.net/gift/message-card/template/image/20240124_IVGHO.png',
    imageUrl: 'https://t1.daumcdn.net/gift/message-card/template/image/20240124_DUVMV.gif',
    defaultTextMessage: '축하해요!',
  },
  {
    id: 902,
    thumbUrl: 'https://t1.daumcdn.net/gift/message-card/template/image/20240123_NCGYP.png',
    imageUrl: 'https://t1.daumcdn.net/gift/message-card/template/image/20240123_HUPAD.gif',
    defaultTextMessage: '축하해요!',
  },
  {
    id: 903,
    thumbUrl: 'https://t1.daumcdn.net/gift/message-card/template/image/20240123_FRJOO.png',
    imageUrl: 'https://t1.daumcdn.net/gift/message-card/template/image/20240123_RBKHM.gif',
    defaultTextMessage: '생일 축하해요!',
  },
  {
    id: 442,
    thumbUrl: 'https://t1.daumcdn.net/gift/message-card/template/image/20220928_GNKBT.png',
    imageUrl: 'https://t1.daumcdn.net/gift/message-card/template/image/20220928_DXNKZ.png',
    defaultTextMessage: '축하해요!',
  },
  {
    id: 316,
    thumbUrl: 'https://t1.daumcdn.net/gift/message-card/template/image/20211230_WUHCL.png',
    imageUrl: 'https://t1.daumcdn.net/gift/message-card/template/image/20211230_QEKWG.png',
    defaultTextMessage: '생일 축하해요!',
  },
  {
    id: 300,
    thumbUrl: 'https://t1.daumcdn.net/gift/message-card/template/image/20211228_PXMBH.png',
    imageUrl: 'https://t1.daumcdn.net/gift/message-card/template/image/20211228_NJEEQ.png',
    defaultTextMessage: '축하해요!',
  },
  {
    id: 443,
    thumbUrl: 'https://t1.daumcdn.net/gift/message-card/template/image/20220928_QUZRJ.jpg',
    imageUrl: 'https://t1.daumcdn.net/gift/message-card/template/image/20220928_CABOZ.png',
    defaultTextMessage: '정말 축하해요~!',
  },
  {
    id: 505,
    thumbUrl: 'https://t1.daumcdn.net/gift/message-card/template/image/20230307_RCKUK.png',
    imageUrl: 'https://t1.daumcdn.net/gift/message-card/template/image/20230307_NLDCL.png',
    defaultTextMessage: '축하합니다!',
  },
  {
    id: 444,
    thumbUrl: 'https://t1.daumcdn.net/gift/message-card/template/image/20220928_YTMIB.jpg',
    imageUrl: 'https://t1.daumcdn.net/gift/message-card/template/image/20220928_RYYXN.png',
    defaultTextMessage: '좋은 일만 가득하세요!',
  },
  {
    id: 317,
    thumbUrl: 'https://t1.daumcdn.net/gift/message-card/template/image/20211230_KFYCB.png',
    imageUrl: 'https://t1.daumcdn.net/gift/message-card/template/image/20211230_MTXOC.png',
    defaultTextMessage: '축하해요!',
  },
  {
    id: 514,
    thumbUrl: 'https://t1.daumcdn.net/gift/message-card/template/image/20230330_IUGOA.png',
    imageUrl: 'https://t1.daumcdn.net/gift/message-card/template/image/20230330_PLVWN.png',
    defaultTextMessage: '오늘의 주인공!',
  },
  {
    id: 503,
    thumbUrl: 'https://t1.daumcdn.net/gift/message-card/template/image/20230307_VYHGA.png',
    imageUrl: 'https://t1.daumcdn.net/gift/message-card/template/image/20230307_WCMYV.png',
    defaultTextMessage: '생일 축하해요!',
  },
  {
    id: 504,
    thumbUrl: 'https://t1.daumcdn.net/gift/message-card/template/image/20230307_ZCBUN.png',
    imageUrl: 'https://t1.daumcdn.net/gift/message-card/template/image/20230307_FFGUZ.png',
    defaultTextMessage: '축하해요!',
  },
  {
    id: 319,
    thumbUrl: 'https://t1.daumcdn.net/gift/message-card/template/image/20211230_GAVHL.png',
    imageUrl: 'https://t1.daumcdn.net/gift/message-card/template/image/20211230_KELHG.png',
    defaultTextMessage: '행복한 하루 되세요!',
  },
  {
    id: 769,
    thumbUrl: 'https://t1.daumcdn.net/gift/message-card/template/image/20231102_QJDEL.png',
    imageUrl: 'https://t1.daumcdn.net/gift/message-card/template/image/20231102_BWENF.png',
    defaultTextMessage: 'ㅊㅋㅊㅋ',
  },
  {
    id: 313,
    thumbUrl: 'https://t1.daumcdn.net/gift/message-card/template/image/20211230_QLCXB.png',
    imageUrl: 'https://t1.daumcdn.net/gift/message-card/template/image/20211230_CWJWN.png',
    defaultTextMessage: '축하해요!',
  },
  {
    id: 457,
    thumbUrl: 'https://t1.daumcdn.net/gift/message-card/template/image/20221107_TSVZA.png',
    imageUrl: 'https://t1.daumcdn.net/gift/message-card/template/image/20221107_NBWCT.png',
    defaultTextMessage: '기분 좋은 하루 되세요~',
  },
  {
    id: 456,
    thumbUrl: 'https://t1.daumcdn.net/gift/message-card/template/image/20221107_FJRQM.png',
    imageUrl: 'https://t1.daumcdn.net/gift/message-card/template/image/20221107_ZLKCB.png',
    defaultTextMessage: '응원합니다!',
  },
  {
    id: 475,
    thumbUrl: 'https://t1.daumcdn.net/gift/message-card/template/image/20221213_HLWPY.png',
    imageUrl: 'https://t1.daumcdn.net/gift/message-card/template/image/20221213_UDDTT.png',
    defaultTextMessage: '',
  },
  {
    id: 329,
    thumbUrl: 'https://t1.daumcdn.net/gift/message-card/template/image/20211230_MRCOQ.png',
    imageUrl: 'https://t1.daumcdn.net/gift/message-card/template/image/20211230_CIKVP.png',
    defaultTextMessage: '고생했어요.',
  },
  {
    id: 325,
    thumbUrl: 'https://t1.daumcdn.net/gift/message-card/template/image/20211230_JYCKD.png',
    imageUrl: 'https://t1.daumcdn.net/gift/message-card/template/image/20211230_GFEAZ.png',
    defaultTextMessage: '걱정하지 마세요.',
  },
  {
    id: 331,
    thumbUrl: 'https://t1.daumcdn.net/gift/message-card/template/image/20211230_LRSFQ.png',
    imageUrl: 'https://t1.daumcdn.net/gift/message-card/template/image/20220103_RNEZJ.png',
    defaultTextMessage: '응원합니다!',
  },
  {
    id: 768,
    thumbUrl: 'https://t1.daumcdn.net/gift/message-card/template/image/20231102_LAJTH.png',
    imageUrl: 'https://t1.daumcdn.net/gift/message-card/template/image/20231102_HYCLM.png',
    defaultTextMessage: '오늘도 럭키 에너지!',
  },
  {
    id: 322,
    thumbUrl: 'https://t1.daumcdn.net/gift/message-card/template/image/20211230_BVYMP.png',
    imageUrl: 'https://t1.daumcdn.net/gift/message-card/template/image/20211230_WWRPV.png',
    defaultTextMessage: '아자아자! 힘내요!',
  },
  {
    id: 327,
    thumbUrl: 'https://t1.daumcdn.net/gift/message-card/template/image/20211230_MICZM.png',
    imageUrl: 'https://t1.daumcdn.net/gift/message-card/template/image/20211230_IFCAW.png',
    defaultTextMessage: '행운 가득한 하루 되세요.',
  },
  {
    id: 328,
    thumbUrl: 'https://t1.daumcdn.net/gift/message-card/template/image/20211230_GHYNQ.png',
    imageUrl: 'https://t1.daumcdn.net/gift/message-card/template/image/20211230_EEHNG.png',
    defaultTextMessage: '잘 할 수 있어요.',
  },
  {
    id: 320,
    thumbUrl: 'https://t1.daumcdn.net/gift/message-card/template/image/20211230_FMHWT.png',
    imageUrl: 'https://t1.daumcdn.net/gift/message-card/template/image/20211230_NEECV.png',
    defaultTextMessage: '아자아자! 힘내요!',
  },
  {
    id: 383,
    thumbUrl: 'https://t1.daumcdn.net/gift/message-card/template/image/20220314_RFJEK.png',
    imageUrl: 'https://t1.daumcdn.net/gift/message-card/template/image/20220314_WLVEM.png',
    defaultTextMessage: '아자아자! 힘내요!',
  },
  {
    id: 391,
    thumbUrl: 'https://t1.daumcdn.net/gift/message-card/template/image/20220322_NGALI.png',
    imageUrl: 'https://t1.daumcdn.net/gift/message-card/template/image/20220322_BCQPQ.png',
    defaultTextMessage: '힘내요.',
  },
  {
    id: 390,
    thumbUrl: 'https://t1.daumcdn.net/gift/message-card/template/image/20220322_YELPH.png',
    imageUrl: 'https://t1.daumcdn.net/gift/message-card/template/image/20220322_OQCGZ.png',
    defaultTextMessage: '빠른 쾌유를 빌어요.',
  },
  {
    id: 385,
    thumbUrl: 'https://t1.daumcdn.net/gift/message-card/template/image/20220314_YRSRX.png',
    imageUrl: 'https://t1.daumcdn.net/gift/message-card/template/image/20220314_AAHZI.png',
    defaultTextMessage: '아프지 마요.',
  },
  {
    id: 384,
    thumbUrl: 'https://t1.daumcdn.net/gift/message-card/template/image/20220314_AEFDP.png',
    imageUrl: 'https://t1.daumcdn.net/gift/message-card/template/image/20220314_GTEQN.png',
    defaultTextMessage: '푹 쉬세요.',
  },
  {
    id: 381,
    thumbUrl: 'https://t1.daumcdn.net/gift/message-card/template/image/20220314_YRAIX.png',
    imageUrl: 'https://t1.daumcdn.net/gift/message-card/template/image/20220314_ZPXJD.png',
    defaultTextMessage: '마음만은 가까이 있어요.',
  },
  {
    id: 382,
    thumbUrl: 'https://t1.daumcdn.net/gift/message-card/template/image/20220314_NHAUW.png',
    imageUrl: 'https://t1.daumcdn.net/gift/message-card/template/image/20220314_GUMZR.png',
    defaultTextMessage: '걱정 마세요!',
  },
  {
    id: 355,
    thumbUrl: 'https://t1.daumcdn.net/gift/message-card/template/image/20211230_LGMUP.png',
    imageUrl: 'https://t1.daumcdn.net/gift/message-card/template/image/20220103_TARZR.png',
    defaultTextMessage: '항상 건강하세요.',
  },
  {
    id: 356,
    thumbUrl: 'https://t1.daumcdn.net/gift/message-card/template/image/20211230_LDRZT.png',
    imageUrl: 'https://t1.daumcdn.net/gift/message-card/template/image/20220103_JEYNX.png',
    defaultTextMessage: '수고하셨습니다.',
  },
  {
    id: 353,
    thumbUrl: 'https://t1.daumcdn.net/gift/message-card/template/image/20211230_KUMRM.png',
    imageUrl: 'https://t1.daumcdn.net/gift/message-card/template/image/20220103_GIEUQ.png',
    defaultTextMessage: '잘 부탁드립니다.',
  },
  {
    id: 357,
    thumbUrl: 'https://t1.daumcdn.net/gift/message-card/template/image/20211230_OIULN.png',
    imageUrl: 'https://t1.daumcdn.net/gift/message-card/template/image/20220103_XCWHR.png',
    defaultTextMessage: '감사의 마음을 전합니다.',
  },
  {
    id: 358,
    thumbUrl: 'https://t1.daumcdn.net/gift/message-card/template/image/20211230_YJUDA.png',
    imageUrl: 'https://t1.daumcdn.net/gift/message-card/template/image/20220103_OCPOO.png',
    defaultTextMessage: '진심으로 축하드립니다.',
  },
  {
    id: 354,
    thumbUrl: 'https://t1.daumcdn.net/gift/message-card/template/image/20211230_GVWRT.png',
    imageUrl: 'https://t1.daumcdn.net/gift/message-card/template/image/20220103_WBAGD.png',
    defaultTextMessage: '늘 건강하고 행복하시길 바랍니다.',
  },
  {
    id: 306,
    thumbUrl: 'https://t1.daumcdn.net/gift/message-card/template/image/20211230_XAXCW.png',
    imageUrl: 'https://t1.daumcdn.net/gift/message-card/template/image/20220103_TSEKS.png',
    defaultTextMessage: '존경의 마음을 담아 선물합니다.',
  },
  {
    id: 360,
    thumbUrl: 'https://t1.daumcdn.net/gift/message-card/template/image/20220103_CIAGZ.png',
    imageUrl: 'https://t1.daumcdn.net/gift/message-card/template/image/20220103_NHFJU.png',
    defaultTextMessage: '행복한 일만 가득하시길 바랍니다.',
  },
  {
    id: 527,
    thumbUrl: 'https://t1.daumcdn.net/gift/message-card/template/image/20230425_JNDEN.png',
    imageUrl: 'https://t1.daumcdn.net/gift/message-card/template/image/20230425_JCAQH.png',
    defaultTextMessage: '정말 고마워요!',
  },
  {
    id: 345,
    thumbUrl: 'https://t1.daumcdn.net/gift/message-card/template/image/20211230_JBEKI.png',
    imageUrl: 'https://t1.daumcdn.net/gift/message-card/template/image/20211230_SMVFF.png',
    defaultTextMessage: '고마워요.',
  },
  {
    id: 307,
    thumbUrl: 'https://t1.daumcdn.net/gift/message-card/template/image/20211230_VYGAJ.png',
    imageUrl: 'https://t1.daumcdn.net/gift/message-card/template/image/20211230_SGFIC.png',
    defaultTextMessage: '고맙습니다.',
  },
  {
    id: 340,
    thumbUrl: 'https://t1.daumcdn.net/gift/message-card/template/image/20211230_GQAKP.png',
    imageUrl: 'https://t1.daumcdn.net/gift/message-card/template/image/20211230_XCZFV.png',
    defaultTextMessage: '고마워요.',
  },
  {
    id: 344,
    thumbUrl: 'https://t1.daumcdn.net/gift/message-card/template/image/20211230_NYTOD.png',
    imageUrl: 'https://t1.daumcdn.net/gift/message-card/template/image/20211230_EIPTP.png',
    defaultTextMessage: '고마워요.',
  },
  {
    id: 341,
    thumbUrl: 'https://t1.daumcdn.net/gift/message-card/template/image/20211230_GSLVX.png',
    imageUrl: 'https://t1.daumcdn.net/gift/message-card/template/image/20211230_PQRWC.png',
    defaultTextMessage: '고마워~',
  },
  {
    id: 342,
    thumbUrl: 'https://t1.daumcdn.net/gift/message-card/template/image/20211230_HJOSC.png',
    imageUrl: 'https://t1.daumcdn.net/gift/message-card/template/image/20211230_TJYYE.png',
    defaultTextMessage: '땡큐 쏘 머취!',
  },
  {
    id: 346,
    thumbUrl: 'https://t1.daumcdn.net/gift/message-card/template/image/20211230_DFSDM.png',
    imageUrl: 'https://t1.daumcdn.net/gift/message-card/template/image/20211230_VCWAA.png',
    defaultTextMessage: '고마워요.',
  },
  {
    id: 351,
    thumbUrl: 'https://t1.daumcdn.net/gift/message-card/template/image/20211230_QRNSO.png',
    imageUrl: 'https://t1.daumcdn.net/gift/message-card/template/image/20211230_MGDWP.png',
    defaultTextMessage: '선물과 상장을 드립니다.',
  },
  {
    id: 348,
    thumbUrl: 'https://t1.daumcdn.net/gift/message-card/template/image/20211230_FRDWZ.png',
    imageUrl: 'https://t1.daumcdn.net/gift/message-card/template/image/20211230_XVCPM.png',
    defaultTextMessage: '멋진 제가 쏩니다!',
  },
  {
    id: 767,
    thumbUrl: 'https://t1.daumcdn.net/gift/message-card/template/image/20231102_EVIDA.png',
    imageUrl: 'https://t1.daumcdn.net/gift/message-card/template/image/20231102_BMWRF.png',
    defaultTextMessage: '행운의 주인공은 바로 너~!',
  },
  {
    id: 765,
    thumbUrl: 'https://t1.daumcdn.net/gift/message-card/template/image/20231102_LFYHR.png',
    imageUrl: 'https://t1.daumcdn.net/gift/message-card/template/image/20231102_CWWLQ.png',
    defaultTextMessage: '내가 쏜다.',
  },
  {
    id: 305,
    thumbUrl: 'https://t1.daumcdn.net/gift/message-card/template/image/20211230_OICQH.png',
    imageUrl: 'https://t1.daumcdn.net/gift/message-card/template/image/20211230_MBECV.png',
    defaultTextMessage: 'ㅋㅋㅋ',
  },
  {
    id: 350,
    thumbUrl: 'https://t1.daumcdn.net/gift/message-card/template/image/20211230_TTVQR.png',
    imageUrl: 'https://t1.daumcdn.net/gift/message-card/template/image/20211230_ZBUEG.png',
    defaultTextMessage: '오다 주웠다.',
  },
  {
    id: 766,
    thumbUrl: 'https://t1.daumcdn.net/gift/message-card/template/image/20231102_PRDBM.png',
    imageUrl: 'https://t1.daumcdn.net/gift/message-card/template/image/20231102_CWIUC.png',
    defaultTextMessage: '선물 당첨!',
  },
  {
    id: 528,
    thumbUrl: 'https://t1.daumcdn.net/gift/message-card/template/image/20230425_VVSXP.png',
    imageUrl: 'https://t1.daumcdn.net/gift/message-card/template/image/20230425_RJBXI.png',
    defaultTextMessage: '제 마음을 받아주세요!',
  },
  {
    id: 333,
    thumbUrl: 'https://t1.daumcdn.net/gift/message-card/template/image/20211230_LBLVK.png',
    imageUrl: 'https://t1.daumcdn.net/gift/message-card/template/image/20211230_QKLLG.png',
    defaultTextMessage: '사랑해요!',
  },
  {
    id: 332,
    thumbUrl: 'https://t1.daumcdn.net/gift/message-card/template/image/20211230_YIVQL.png',
    imageUrl: 'https://t1.daumcdn.net/gift/message-card/template/image/20211230_EFTCJ.png',
    defaultTextMessage: '헤롱 헤롱- 당신에게 취했어요.',
  },
  {
    id: 303,
    thumbUrl: 'https://t1.daumcdn.net/gift/message-card/template/image/20211230_DPKUF.png',
    imageUrl: 'https://t1.daumcdn.net/gift/message-card/template/image/20211230_SPTVG.png',
    defaultTextMessage: '사랑해요!',
  },
  {
    id: 334,
    thumbUrl: 'https://t1.daumcdn.net/gift/message-card/template/image/20211230_XGUCW.png',
    imageUrl: 'https://t1.daumcdn.net/gift/message-card/template/image/20211230_XSYZO.png',
    defaultTextMessage: '제 마음의 표현이에요.',
  },
  {
    id: 337,
    thumbUrl: 'https://t1.daumcdn.net/gift/message-card/template/image/20211230_JKXBU.png',
    imageUrl: 'https://t1.daumcdn.net/gift/message-card/template/image/20211230_RLATD.png',
    defaultTextMessage: '함께 있어 행복해요.',
  },
  {
    id: 339,
    thumbUrl: 'https://t1.daumcdn.net/gift/message-card/template/image/20211230_VFLTE.png',
    imageUrl: 'https://t1.daumcdn.net/gift/message-card/template/image/20211230_HHEAR.png',
    defaultTextMessage: '알러뷰!',
  },
  {
    id: 336,
    thumbUrl: 'https://t1.daumcdn.net/gift/message-card/template/image/20211230_UCWBY.png',
    imageUrl: 'https://t1.daumcdn.net/gift/message-card/template/image/20211230_MTCFU.png',
    defaultTextMessage: '사랑을 가득 담아 드려요.',
  },
  {
    id: 338,
    thumbUrl: 'https://t1.daumcdn.net/gift/message-card/template/image/20211230_LBDUG.png',
    imageUrl: 'https://t1.daumcdn.net/gift/message-card/template/image/20211230_HXRYQ.png',
    defaultTextMessage: '사랑해요.',
  },
  {
    id: 335,
    thumbUrl: 'https://t1.daumcdn.net/gift/message-card/template/image/20211230_BCPLX.png',
    imageUrl: 'https://t1.daumcdn.net/gift/message-card/template/image/20211230_KBGQH.png',
    defaultTextMessage: '사랑해요!',
  },
];
