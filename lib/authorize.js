import { Admin } from "../models"

async function authorize(id) {
	return !!Admin.findById(id)
}

export default authorize