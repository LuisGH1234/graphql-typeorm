interface IResolver {
    [key: string]: (obj: any, args: any, context: any, info: any) => any;
}
