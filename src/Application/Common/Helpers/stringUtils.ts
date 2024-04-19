export async function generateTimeStamp() :Promise<string>{
    const currentTimeStamp = Date.now();
    return Math.floor(currentTimeStamp / 1000).toString();
  }