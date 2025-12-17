import { useState } from "react";
import "../../../node_modules/@types/web-bluetooth/index.d.ts";

const SLIDE_SWITCHER_SERVICE = "4fafc201-1fb5-459e-8fcc-c5c9c331914b";
const COMMAND_CHAR = "0xFFE1";

function useBluetooth(): [string, () => Promise<void>] {
  const [status, setStatus] = useState<string>("Connect to bluetooth");
  if (!navigator.bluetooth) {
    setStatus("Bluetooth isn't supported");
  }

  const connectToDevice = async () => {
    if (!navigator.bluetooth) return;
    const device = await navigator.bluetooth.requestDevice({
      filters: [{ services: [SLIDE_SWITCHER_SERVICE] }],
      optionalServices: [SLIDE_SWITCHER_SERVICE],
    });
    const server = await device.gatt?.connect();
    const service = await server?.getPrimaryService(SLIDE_SWITCHER_SERVICE);
    const characteristic = await service?.getCharacteristic(COMMAND_CHAR);

    if (!characteristic) return;
    await characteristic.startNotifications();

    characteristic.addEventListener("characteristicvaluechanged", (event) => {
      const target = event.target as BluetoothRemoteGATTCharacteristic;
      if (target.value) {
        const command = new TextDecoder().decode(target.value);
        console.log("Получена команда:", command);

        if (command.trim() === "next") {
          console.log("Next");
        } else if (command.trim() === "prev") {
          console.log("Prev");
        }
      }
    });
  };

  return [status, connectToDevice];
}

export { useBluetooth };
