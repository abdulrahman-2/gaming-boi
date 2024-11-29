export type LinkType = {
  label: string;
  href: string;
  icon: React.ReactElement;
};

export type ItemsType = {
  id: number;
  src: string;
  card: React.ReactNode;
};

export type CardInfoType = {
  desc: string;
  title: string;
  image: string;
  textBtn?: string;
  btnClasses?: string;
};
