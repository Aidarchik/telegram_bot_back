import workerManager from "../WorkerManager.js";

class PmService {
  async list() {
    const result = await workerManager.workerList();
    const simplified = result.map((proc) => {
      const {
        name,
        pm_id,
        monit: { memory, cpu },
        pm2_env: { status },
      } = proc;
      return {
        id: pm_id,
        name,
        status,
        memoryMB: (memory / 1024 / 1024).toFixed(1), // память в MB
        cpu: cpu.toFixed(1) + "%",
      };
    });
    console.log("Упрощённый список процессов:");
    console.table(simplified);
    return simplified;
  }
  async run() {
    const result = await workerManager.workerStart();
    return result;
  }
  async stop() {
    const result = await workerManager.workerStop();
    return result;
  }
  async delete() {
    const result = await workerManager.workerDelete();
    return result;
  }
}

export default new PmService();
