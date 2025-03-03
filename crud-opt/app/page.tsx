import EmployeePage from './employees/page';
import Header from '../components/header';

export default function Home() {
  return(
    <div>
      <Header />
      <EmployeePage searchParams={{ cursor: undefined }} />
    </div>
  )
}