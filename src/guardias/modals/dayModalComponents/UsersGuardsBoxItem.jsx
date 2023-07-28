import { Grid, IconButton } from "@mui/material";
import { LabelButton } from "./LabelButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { useGuardDayStore } from "../../../hooks/useGuardDayStore";
import { useAppUsersStore } from "../../../hooks/useAppUsersStore";
import TeachersMenu from "./TeachersMenu";
import CoursesMenu from "./CoursesMenu";
import { useSelector } from "react-redux";
import { useCoursesStore } from "../../../hooks/useCoursesStore";
import { sortedTechnicians } from "../../../helpers/sortedTechnicians";
import { sortedCourses } from "../../../helpers/sortedCourses";

export const UsersGuardsBoxItem = ({ technician, index, onDeleteItem }) => {
  const { guardDayOpened, techniciansInGuardDay, updateOpenedGuardDay } =
    useGuardDayStore();
  //console.log({ techniciansInGuardDay });
  const { getTeacherById } = useAppUsersStore();
  const { getCourseById } = useCoursesStore();

  const { courses } = useSelector((state) => state.course);

  let initialTeacher = getTeacherById(
    guardDayOpened.technicians[index].technicianId
  );

  //que aquí compruebe si está el curso "sin curso" y si no, que lo cree
  const initialCourse = getCourseById(
    courses,
    guardDayOpened.technicians[index].courseId
  );

  const onLabelChange = (value, name) => {
    let newTechnicians = [...guardDayOpened.technicians];
    newTechnicians[index] = {
      ...newTechnicians[index],
      [name]: value,
    };
    updateOpenedGuardDay({
      ...guardDayOpened,
      technicians: [...newTechnicians],
    });
  };

  const isValid = (value) => {
    return (
      value !== null && value !== undefined && JSON.stringify(value) !== "{}"
    );
  };

  return (
    <Grid
      container
      direction={{ /* xs: "column", */ md: "row" }}
      justifyContent={{ xs: "center", md: "space-between" }}
      alignItems={{ xs: "center", md: "center" }}
      pr={1}
      sx={{
        border: { xs: "1px solid grey", md: "none" },
        borderRadius: { xs: "4px", md: "none" },
        mb: { xs: 0.4, md: 0 },
      }}
    >
      <Grid item xs={12} md={2} sx={{ textAlign: "center" }}>
        {/*  <Typography sx={{ visibility: "hidden" }}>técnico</Typography> */}
        {/* <Typography sx={{ md: { display: "none" } }}>técnico</Typography> */}
        <TeachersMenu
          initialValue={initialTeacher}
          list={sortedTechnicians(techniciansInGuardDay)} //aquí podría haber un useMemo q se recalculara cuando cambiaran los técnicos del techniciansOut
          name="técnico"
          index={index}
        />
      </Grid>

      <Grid item xs={12} md={7}>
        <CoursesMenu
          initialValue={initialCourse}
          list={sortedCourses(courses)}
          name="sin curso"
          index={index}
        />
      </Grid>

      <Grid item xs={12} md={3}>
        <Grid
          container
          justifyContent={{ xs: "space-between", md: "space-between" }}
          alignItems={{ xs: "center", md: "center" }}
          direction="row"
        >
          <Grid
            item
            mr={{ xs: 0, md: 2 }}
            ml={{ xs: 2, md: 0 }}
            mb={{ xs: 0.25, md: 0 }}
            md={2 + 1 / 2}
            sx={{
              visibility:
                !isValid(initialCourse) || initialCourse?.title === "SIN CURSO"
                  ? "hidden"
                  : "visible",
            }}
          >
            <LabelButton
              labelValue={guardDayOpened.technicians[index].isInClientWorkplace}
              textOn="en cliente"
              textOff="en oficina"
              onLabelChange={onLabelChange}
              name="isInClientWorkplace"
              technician={technician}
            />
          </Grid>

          <Grid item md={1 / 2} mr={{ xs: -1 / 2, md: 3 }}>
            <IconButton
              sx={{ color: "#CF0000" }}
              onClick={() => onDeleteItem(technician.uniqueId)}
            >
              <DeleteIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>

      {/* <Grid
        item
        ml={{ xs: 2, md: 0 }}
        md={2 + 1 / 2}
        sx={{
          visibility:
            !isValid(initialCourse) || initialCourse?.title === "SIN CURSO"
              ? "hidden"
              : "visible",
        }}
      >
        <LabelButton
          labelValue={guardDayOpened.technicians[index].isInClientWorkplace}
          textOn="en cliente"
          textOff="en oficina"
          onLabelChange={onLabelChange}
          name="isInClientWorkplace"
          technician={technician}
        />
      </Grid>

      <Grid item md={1 / 2}>
        <IconButton
          sx={{ color: "#CF0000" }}
          onClick={() => onDeleteItem(technician.uniqueId)}
        >
          <DeleteIcon />
        </IconButton>
      </Grid> */}
    </Grid>
  );
};
