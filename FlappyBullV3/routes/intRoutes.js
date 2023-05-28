import {express} from "../dependencies.js"
import { postIntData, getInt} from "../controllers/intController.js";

const router = express.Router()

router.post('/', postIntData)
router.get('/', getInt)

export default router