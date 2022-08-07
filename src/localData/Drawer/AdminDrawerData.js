import {
  Dashboard, FolderShared, LocalHotel, Logout, Person
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
    name: "Records",
    path: "/admin/records",
    icon: <FolderShared />
  },
  {
    name: "Logout",
    path: "/",
    icon: <Logout />
  },
]

export default data