// const processTextSegments = useCallback(
//     (content: string, annotations: Annotation[]) => {
//       if (!annotations.length) {
//         return [{ text: content, annotations: [] }];
//       }

//       // Find all annotation boundaries
//       type Boundary = {
//         index: number;
//         isStart: boolean;
//         annotation: Annotation;
//       };

//       const boundaries: Boundary[] = [];

//       annotations.forEach((annotation) => {
//         const regex = new RegExp(annotation.regex, 'g');
//         let match;

//         while ((match = regex.exec(content)) !== null) {
//           boundaries.push(
//             {
//               index: match.index,
//               isStart: true,
//               annotation,
//             },
//             {
//               index: match.index + match[0].length,
//               isStart: false,
//               annotation,
//             }
//           );
//         }
//       });

//       // Sort boundaries by index
//       boundaries.sort((a, b) => {
//         if (a.index !== b.index) return a.index - b.index;
//         return a.isStart ? -1 : 1;
//       });

//       if (!boundaries.length) {
//         return [{ text: content, annotations: [] }];
//       }

//       // Create segments
//       const segments: Array<{
//         text: string;
//         annotations: Annotation[];
//       }> = [];

//       let currentIndex = 0;
//       const activeAnnotations: Annotation[] = [];

//       boundaries.forEach((boundary) => {
//         if (currentIndex < boundary.index) {
//           segments.push({
//             text: content.slice(currentIndex, boundary.index),
//             annotations: [...activeAnnotations],
//           });
//         }

//         if (boundary.isStart) {
//           activeAnnotations.push(boundary.annotation);
//         } else {
//           const index = activeAnnotations.findIndex(
//             (a) => a === boundary.annotation
//           );
//           if (index !== -1) {
//             activeAnnotations.splice(index, 1);
//           }
//         }

//         currentIndex = boundary.index;
//       });

//       if (currentIndex < content.length) {
//         segments.push({
//           text: content.slice(currentIndex),
//           annotations: [...activeAnnotations],
//         });
//       }

//       return segments;
//     },
//     []
//   );