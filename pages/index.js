import { Fragment } from "react";
import Head from "next/head";
import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";

// const DUMMY_MEETUPS = [
//   {
//     id: "m1",
//     title: "First meetup",
//     address: "somewhere 5 rue de nulle part",
//     description: "This is the First meetup",
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/6/6d/The_Hague_Montage_2021.png",
//   },
//   {
//     id: "m2",
//     title: "Second meetup",
//     address: "somewhere 5 rue de nulle part",
//     description: "This is the Second meetup",
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/6/6d/The_Hague_Montage_2021.png",
//   },
//   {
//     id: "m3",
//     title: "Third meetup",
//     address: "somewhere 5 rue de nulle part",
//     description: "This is the third meetup",
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/6/6d/The_Hague_Montage_2021.png",
//   },
//   {
//     id: "m4",
//     title: "Fourth meetup",
//     address: "somewhere 5 rue de nulle part",
//     description: "This is the Fourth meetup",
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/6/6d/The_Hague_Montage_2021.png",
//   },
// ];

function HomePage(props) {
  // console.log("regenerate");
  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta name="description" content="my super cool meetup next js app" />
      </Head>
      <MeetupList meetups={props.meetups} />;
    </Fragment>
  );
}

export async function getStaticProps() {
  //executed during build process - not on client!
  // eg fetch data from API endpoint

  const DATABASE_URL = "mongodb://192.168.86.100:27017/udemy-react";
  const MONGO_DB = "udemy-react";
  const MONGO_COLLECTION = "meetups";

  const client = await MongoClient.connect(DATABASE_URL);
  const db = client.db();

  const meetupsCollection = db.collection(MONGO_COLLECTION);

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: (await meetups).map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
}

export default HomePage;
