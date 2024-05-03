import mongoose, { ConnectOptions } from "mongoose";

type connectionObject = {
  isconnected?: number;
};

const connection: connectionObject = {};

export const dbConnect = async (): Promise<void> => {
  if (connection.isconnected) {
    console.log(" already connected");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGOOSE_URI||"");
    connection.isconnected = db.connections[0].readyState;
    console.log("connected to database");
  } catch (error) {
    console.log("database not connected", error);
    process.exit(1);
  }
};
