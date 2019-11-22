declare module 'rfdc' {
  interface opts {
    proto?: boolean,
  }

  export default function rfdc(opts?: opts): (o: any) => any;
}
