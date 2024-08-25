function DashboardStats({ title, icon, value, description }) {
  return (
    <div className='stats bg-transparent shadow backdrop-filter border-2 border-gray-700 backdrop-blur-sm'>
      <div className='stat text-wh'>
        <div className={"stat-figure text-white"}>{icon}</div>
        <div className={"stat-title text-white"}>{title}</div>
        <div className={"stat-value text-white mb-5"}>{value}</div>
        <div className={"stat-desc text-white text-md"}>{description}</div>
      </div>
    </div>
  );
}

export default DashboardStats;
