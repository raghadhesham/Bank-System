import { userModel } from "../../models/user.model.js";
import { db } from "../db.connection.js";
const session = await db.startSession();
export const create = ({ model, data, session }) => {
  return model.create(data);
};
export const findOne = ({ model, filter, select, session }) => {
  let query = model.findOne(filter);
  if (select) {
    query = query.select(select);
  }
  return query;
};
export const findById = ({ model, id, options, session }) => {
  return model.findById(id, options);
};
export const findByIdAndUpdate = ({ model, id, data, options, session }) => {
  return model.findByIdAndUpdate(id, data, { new: true, ...options });
};
export const find = ({ model, filter, select, session }) => {
  let query = model.find(filter);
  if (select) {
    query = query.select(select);
  }
  return query;
};

export const findOneAndUpdate = ({ model, filter, data, select, session }) => {
  let query = model.findOneAndUpdate(filter, data, { new: true });
  if (select) {
    query = query.select(select);
  }
  return query;
};
