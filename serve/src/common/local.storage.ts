import * as multer from "multer";
import * as fs from 'fs';
import * as path from "path";
import { ulid } from "ulid";

const localStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        try {
            fs.mkdirSync(path.join(process.cwd(), 'uploads'));
        } catch (e) { }

        cb(null, path.join(process.cwd(), 'uploads'))
    },
    filename: function (req, file, cb) {
        const fileName = ulid() + "" + path.extname(file.originalname);
        cb(null, fileName)
    }
});

export { localStorage };