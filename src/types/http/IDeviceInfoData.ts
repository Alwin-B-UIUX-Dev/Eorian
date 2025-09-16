// types/device.types.ts

export type DetectionMethod = 'server';

export interface IBaseInfoData {
  name: string;
  version: string;
}
export interface IBrowserInfoData extends IBaseInfoData {}
export interface IEngineInfoData extends IBaseInfoData {}
export interface IOSInfoData extends IBaseInfoData {}

export interface IDeviceInfoData {
  user_agent: string;
  browser: IBrowserInfoData;
  engine: IEngineInfoData;
  os: IOSInfoData;
  device: {
    type: string;
    vendor: string;
    model: string;
  };
  cpu: {
    architecture: string;
  };
  is_touch: boolean;
  detected_at: string; // ISO string
  detection_method: DetectionMethod;
}
