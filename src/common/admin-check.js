const isAdmin = address =>{
  const admins = process.env.ADMIN_LIST;
  if (admins){
    const adminList = admins.split(",");
    return adminList.includes(address);
  } else return false;
}

export default isAdmin;