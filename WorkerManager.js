import pm2 from "pm2";

class WorkerManager {
  workerList() {
    return new Promise((resolve, reject) => {
      pm2.connect((err) => {
        if (err) {
          console.log("error");
          process.exit(2);
        }

        pm2.list((err, procList) => {
          pm2.disconnect();
          if (err) throw err;
          resolve(procList);
        });
      });
    });
  }
  workerStart() {
    pm2.connect((err) => {
      if (err) {
        console.log("error");
        process.exit(2);
      }

      pm2.start(
        {
          script: "worker.js",
          name: "worker",
          instances: 2,
          exec_mode: "cluster",
        },
        (err, apps) => {
          if (err) throw err;
          console.log("Приложение worker запущено");
          pm2.disconnect();
        }
      );
    });
    return { message: "workerStart" };
  }
  workerStop() {
    pm2.connect((err) => {
      if (err) {
        console.log("error");
        process.exit(2);
      }

      pm2.stop("worker", (err, apps) => {
        if (err) throw err;

        console.log("Приложение worker остановлено");

        pm2.disconnect();
      });
    });
    return { message: "workerStop" };
  }
  workerDelete() {
    pm2.connect((err) => {
      if (err) {
        console.log("error");
        process.exit(2);
      }

      pm2.delete("worker", (err, apps) => {
        if (err) throw err;

        console.log("Приложение worker удалено");

        pm2.disconnect();
      });
    });
    return { message: "workerDelete" };
  }
}

export default new WorkerManager();
