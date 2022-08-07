import {
  Dashboard, Logout, Person
} from '@mui/icons-material';


const data = [
  {
    name: "Dashboard",
    path: "/admin/",
    icon: <Dashboard />
  },
  {
    name: "Patients",
    path: "/admin/patients",
    icon: <Person />
  },
  {
    name: "Logout",
    path: "/",
    icon: <Logout />
  },
]

export default data