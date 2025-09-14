import React from "react";
// import './WorkExperience.css';
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBriefcase } from "@fortawesome/free-solid-svg-icons";
import { Slide } from "react-awesome-reveal";
import SectionTitle from "./widget/SectionTitle";

const experiences = [
  {
    id: 1,
    title: "Android Developer",
    date: "April 2024 - Present",
    company: "PT. Ako Media Asia (SALT Indonesia)",
    logo: "./salt-logo.svg", // Ganti dengan logo asli jika ada
    details: [
      'Contributed to the development of the <a href="">Dunia Games</a> Android application, collaborating with a team to deliver features based on Telkomsel’s requirements as the Product Owner, enhancing the user experience for 1 million+ downloads on the Play Store.',
      "Ensured a Crash-Free Percentage above 99% using App Crash Monitoring to maintain app stability and performance.",
      "Redesigned the app’s architecture by migrating from MVP to MVVM, switching UI from XML to Jetpack Compose, and converting Java code to Kotlin. This improved maintainability and reduced development time by 50%.",
    ],
  },
  {
    id: 2,
    title: "Android Developer",
    date: "Maret 2022 - April 2024",
    company: "PT. Kompas Media Nusantara (Harian Kompas)",
    logo: "./kompas-logo.png", // Ganti dengan logo asli jika ada
    details: [
      'Contributed to the development of the <a href="https://play.google.com/store/apps/details?id=id.kompas.app">Kompas.id</a> Android application, enhancing the user experience for 500k+ downloads on the Play Store.',
      "Implemented unit testing in the Android application to ensure the reliability and correctness of core functionalities. Successfully increased unit test coverage from 0% to 40%, improving code quality and reducing potential bugs in production.",
      "Researched and developed new features and technologies for the Kompas.id app, enhancing performance and user experience.",
      "Planned and implemented Clean Architecture, making the codebase easier to maintain and reducing bug-fixing time by 50%, with clear documentation for future development.",
    ],
  },
  {
    id: 3,
    title: "Mobile Development Fasilitator",
    date: "February 2022 – Juli 2022",
    company: "Bangkit Academy, Google, Tokopedia, Gojek, & Traveloka",
    logo: "./bangkit-logo.png", // Ganti dengan logo asli jika ada
    details: [
      "Lead group discussions and training sessions to enhance understanding of course materials.",
      "Provide one-on-one guidance to participants struggling with concepts or assignments. ",
      "Motivate participants to achieve their learning goals and maintain consistent progress.",
      "Collaborate with mentors and Bangkit team members to streamline the learning experience.",
    ],
  },
  {
    id: 4,
    title: "Android Developer (Intern)",
    date: "August 2021 – February 2022",
    company: "PT. Kompas Media Nusantara (Harian Kompas)",
    logo: "./kompas-logo.png", // Ganti dengan logo asli jika ada
    details: [
      "Collaborate with UI/UX Designers to apply the designs that have been made to the Kompas.id Android Application.",
      "Implement the API that has been created by the backend team for use in the Kompas.id Android application.",
      "Conduct research to create new features or technologies that will be implemented in the Kompas.id application.",
    ],
  },
];

const WorkExperience: React.FC = () => (
  <section id="experience" className="mx-auto max-w-[1100px] px-4">
    <SectionTitle title="Work Experience" subtitle="Experience" />
    <VerticalTimeline>
      {experiences.map((exp, idx) => (
        <VerticalTimelineElement
          key={exp.id + "-" + idx}
          className="vertical-timeline-element--work"
          contentStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
          contentArrowStyle={{ borderRight: "7px solid  rgb(33, 150, 243)" }}
          date={exp.date}
          iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
          icon={<FontAwesomeIcon icon={faBriefcase} size="lg" />}
        >
          <h3 className="vertical-timeline-element-title">{exp.title}</h3>
          <h4 className="vertical-timeline-element-subtitle">{exp.company}</h4>

          <img
            src={exp.logo}
            alt={exp.company}
            style={{ height: 20, margin: "12px 0" }}
          />
          {/* Hide details on tablet and below */}
          <ol className="hidden lg:block my-2 pl-4 list-disc text-white text-base">
            {exp.details.map((item, i) => (
              <li key={i} className="mb-2">
                {typeof item === "string" && item.includes("<a") ? (
                  <span
                    dangerouslySetInnerHTML={{
                      __html: item.replace(
                        "<a ",
                        "<a style='font-weight:600;text-decoration:underline' class='transition-colors' "
                      ),
                    }}
                  />
                ) : (
                  item
                )}
              </li>
            ))}
          </ol>
        </VerticalTimelineElement>
      ))}
    </VerticalTimeline>
  </section>
);

export default WorkExperience;
