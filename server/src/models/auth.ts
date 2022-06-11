import { USERS_COLLECTION_NAME } from '../utils/db';
import { getCollection } from '../utils/helpers';
import jwt from 'jsonwebtoken';

export class User {
  email: string;
  hashedPassword: any;
  dateCreated: Date;

  constructor(email: string, hashedPassword: any) {
    this.email = email; // make email.toLowerCase(); and remove sanitised email?
    this.hashedPassword = hashedPassword;
    this.dateCreated = new Date();
  }

  async saveToDb() {
    try {
      const collection = getCollection(USERS_COLLECTION_NAME);
      const sanitisedEmail = this.email.toLowerCase();
      const insertedUser = await collection.insertOne(this);
      const token = jwt.sign(insertedUser, sanitisedEmail, {
        expiresIn: 60 * 24,
      });
      return token;
    } catch (err) {
      throw err;
    }
  }

  static async fetchAll() {
    try {
      const collection = getCollection(USERS_COLLECTION_NAME);
      const users = await collection.find().toArray(); // @todo: may need to optimise as it gets ALL users - what if a million users existed?
      return users;
    } catch (err) {
      throw err;
    }
  }

  static async findByEmail(email: string) {
    try {
      const collection = getCollection(USERS_COLLECTION_NAME);
      const user = await collection.findOne({ email });
      return user;
    } catch (err) {
      throw err;
    }
  }
}
