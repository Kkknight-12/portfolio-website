// import {
//   Box,
//   Button,
//   Card,
//   CardContent,
//   Divider,
//   Stack,
//   Typography,
// } from "@mui/material";
// import { styled } from "@mui/system";
// import React, { useRef, useState } from "react";
//
// const LandingPageCard = styled(Card)({
//   maxWidth: 600,
//   margin: "auto",
//   marginTop: 50,
//   display: "flex",
//   flexDirection: "column",
//   alignItems: "center",
//   borderRadius: "8px",
// });
//
// const ExpandButton = styled(Button)({});
//
// const ExpandedContent = styled("div")(({ theme, expanded }) => {
//   const isDarkMode = theme.palette.mode === "dark";
//   const gradiant = isDarkMode
//     ? "rgba(0, 0, 0, 0.8))"
//     : "rgb(227 227 224 / 90%))";
//
//   return {
//     overflow: "hidden",
//     transition: "max-height 0.5s ease-in-out",
//     maxHeight: expanded ? "1000px" : "120px",
//     position: "relative",
//     borderRadius: 8,
//     "&::before": {
//       content: '""',
//       position: "absolute",
//       bottom: 0,
//       left: 0,
//       right: 0,
//       height: "30px",
//       background: expanded
//         ? "none"
//         : `linear-gradient(to bottom, transparent, ${gradiant}`,
//       pointerEvents: "none",
//     },
//   };
// });
//
// const CustomTimelineItem = ({ date, title, description }) => (
//   <Box
//     sx={{
//       position: "relative",
//       display: "flex",
//       alignItems: "center",
//       paddingLeft: 2,
//     }}
//   >
//     <Divider
//       orientation="vertical"
//       flexItem
//       sx={{
//         height: "100%",
//         position: "absolute",
//         transform: "translateX(-50%)",
//         mb: 10,
//         width: 20,
//       }}
//     />
//     <Box sx={{ marginLeft: 2, padding: 2, flex: 1 }}>
//       <Typography variant="h6">{date}</Typography>
//       <Typography variant="subtitle1">{title}</Typography>
//       <Typography variant="body2">{description}</Typography>
//     </Box>
//   </Box>
// );
//
// const Description = ({ company, location }) => {
//   return (
//     <>
//       <Typography> Company Name: {company} </Typography>
//       <Typography> Location: {location} </Typography>
//     </>
//   );
// };
//
// const CustomTimeline = () => {
//   const experiences = [
//     {
//       date: "2021 - Present",
//       title: "React | Svelte Developer",
//       description: (
//         <Description company={"Techstuff"} location={"Indore ( Remote Job )"} />
//       ),
//     },
//     {
//       date: "2020 - 2021",
//       title: "React Developer",
//       description: (
//         <Description company={"Mindnerves"} location={"Pune ( Remote Job )"} />
//       ),
//     },
//     {
//       date: "2013 - 2018",
//       title: "Job Title 2",
//       description: <Description />,
//     },
//   ];
//
//   return (
//     <Box sx={{ my: 5 }}>
//       {experiences.map((exp, index) => (
//         <React.Fragment key={index}>
//           <CustomTimelineItem {...exp} />
//           <br />
//         </React.Fragment>
//       ))}
//     </Box>
//   );
// };
//
// const Experience = () => {
//   const [expanded, setExpanded] = useState(false);
//
//   const expandedContentRef = useRef(null);
//
//   if (expandedContentRef.current) {
//     console.log(
//       "Expanded Content Height:",
//       expandedContentRef.current.clientHeight
//     );
//   }
//
//   const handleExpandClick = () => {
//     setExpanded(!expanded);
//   };
//
//   return (
//     <Stack alignItems={"center"}>
//       <LandingPageCard>
//         <CardContent sx={{ padding: "0 !important" }}>
//           <ExpandedContent expanded={expanded} ref={expandedContentRef}>
//             <Typography variant="h5" gutterBottom sx={{ padding: 2 }}>
//               Professional Experience
//             </Typography>
//             <Typography variant="body1" sx={{ padding: 2 }}>
//               In this 2 year span I have worked at 2 startups below is the brief
//               information.
//             </Typography>
//             <CustomTimeline />
//           </ExpandedContent>
//         </CardContent>
//       </LandingPageCard>
//       <ExpandButton onClick={handleExpandClick}>
//         {expanded ? "Collapse" : "Expand"}
//       </ExpandButton>
//     </Stack>
//   );
// };
//
// export default Experience;