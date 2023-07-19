export default async function SocketTransformModule(response: MessageEvent) {
  if (typeof response.data === "object") {
    const arrayBuffer = await response.data.text();
    return binaryHandler(arrayBuffer);
  }

  const message = JSON.parse(response.data);
  return message;
}

//소켓 메시지가 바이너리 데이터인 경우
function binaryHandler(message: string) {
  const dataArray = message.split("|");
  const data = {
    mid: dataArray[3],
    start: dataArray[7],
    end: dataArray[8],
    activeFull: dataArray[9],
    wait: dataArray[10],
    active: dataArray[11],
    partCount: dataArray[5],
    planCount: dataArray[6],
    mkey: dataArray[13],
  };
  // remainCount : planCount - partCount,
  return data;
}
