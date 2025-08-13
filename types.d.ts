type Statistics = {
  cpuUsage: number;
  ramUsage: number;
  // storageData: any;
};

type StaticData = {
  cpuModel: string;
  totalMemory: number;
};

type EventPayloadMapping = {
  statistics: Statistics;
  getStaticData: StaticData;
};

type UnsubscribeFunction = () => void;

interface Window {
  electron: {
    subscribeStatistics: (
      callback: (statistics: Statistics) => void
    ) => UnsubscribeFunction;
    getStaticData: () => Promise<StaticData>;
  };
}
