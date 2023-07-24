import MachineStatDto from "../dto/machine/machineStat.dto";
import { BinaryMessageType } from "../../config/constants";

export default async function SocketTransformModule(
  response: MessageEvent
): Promise<MachineStatDto | any> {
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

  switch (dataArray[1]) {
    case BinaryMessageType.NOTI:
      return notiData(dataArray);

    case BinaryMessageType.PART_COUNT:
      return partCountData(dataArray);

    case BinaryMessageType.MESSAGE:
      return messageData(dataArray);

    case BinaryMessageType.ALARM:
      return alarmData(dataArray);
  }
}

function notiData(dataArray: string[]) {
  const rtdList = [
    "s1load",
    "s1speed",
    "xact",
    "xload",
    "zact",
    "zload",
    "block",
    "estop",
    "execution",
    "fcommand",
    "line",
    "mode",
    "partcount",
    "pathfeedrate",
    "pathposition",
    "plancount",
    "programcomment",
    "toolid",
    "bact",
    "bload",
    "cact",
    "cload",
    "s2load",
    "s2speed",
    "s320load",
    "s320speed",
    "yact",
    "yload",
    "block2",
    "execution2",
    "mode2",
    "pathposition2",
    "programcomment2",
    "toolid2",
  ];
  const updates = [];
  const rtd = [];
  for (let i = 6; i < dataArray.length; i = i + 2) {
    const key = dataArray[i].toLowerCase().replace("_", "");
    const value = dataArray[i + 1];

    if (rtdList.includes(key)) {
      rtd.push({ key, value });
    } else {
      updates.push({ key, value });
    }
  }

  return { type: BinaryMessageType.NOTI, target: dataArray[4], updates, rtd };
}

function partCountData(dataArray: string[]) {
  return dataArray;
}

function messageData(dataArray: string[]) {
  return dataArray;
}

function alarmData(dataArray: string[]) {
  return dataArray;
}
