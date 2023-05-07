interface GetAgeProps {
  getAge: (tiem: string) => string
}

export default (): GetAgeProps => {

  const getAge = (yearStr: string): string => {
    const today = new Date();
    const birthDate = new Date(`${yearStr.slice(0, 4)}-01-01`);
    let age = today.getFullYear() - birthDate.getFullYear();
    if (today < new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate())) {
      age--;
    }
    return age.toString();
  }
  
  return {
    getAge
  }
}