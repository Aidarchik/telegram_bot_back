import PmService from "../services/PmService.js";

class PmController {
  async list(req, res) {
    try {
      const result = await PmService.list();
      res.status(200).json(result);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }
  async run(req, res) {
    try {
      const result = await PmService.run();
      res.status(200).json(result);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }
  async stop(req, res) {
    try {
      const result = await PmService.stop();
      res.status(200).json(result);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }
  async delete(req, res) {
    try {
      const result = await PmService.delete();
      res.status(200).json(result);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }
}

export default new PmController();
