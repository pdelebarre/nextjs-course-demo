import { MongoClient, ObjectId } from "mongodb";
import MeetupDetail from "../../components/meetups/MeetupDetail";

function MeetupDetails(props) {
  console.log(`props`, props);
  return (
    <MeetupDetail
      image="https://upload.wikimedia.org/wikipedia/commons/6/6d/The_Hague_Montage_2021.png"
      title={props.meetupData.title}
      description={props.meetupData.description}
      address={props.meetupData.address}
    />
  );
}

export async function getStaticPaths() {
  const DATABASE_URL = "mongodb://192.168.86.100:27017/udemy-react";
  const MONGO_DB = "udemy-react";
  const MONGO_COLLECTION = "meetups";

  const client = await MongoClient.connect(DATABASE_URL);
  const db = client.db();

  const meetupsCollection = db.collection(MONGO_COLLECTION);

  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    fallback: false,
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;

  const DATABASE_URL = "mongodb://192.168.86.100:27017/udemy-react";
  const MONGO_DB = "udemy-react";
  const MONGO_COLLECTION = "meetups";

  const client = await MongoClient.connect(DATABASE_URL);
  const db = client.db();

  const meetupsCollection = db.collection(MONGO_COLLECTION);

  const selectedMeetup = await meetupsCollection.findOne({
    _id: ObjectId(meetupId),
  });

  client.close();

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description,
      },
    },
  };
}

export default MeetupDetails;
