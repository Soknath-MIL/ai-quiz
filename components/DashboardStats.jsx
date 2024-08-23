function DashboardStats({title, icon, value, description}){
    return(
        <div className="stats shadow">
            <div className="stat">
                <div className={`stat-figure dark:text-slate-300 }`}>{icon}</div>
                <div className="stat-title dark:text-slate-300">{title}</div>
                <div className={`stat-value dark:text-slate-300 }`}>{value}</div>
                <div className={"stat-desc  "}>{description}</div>
            </div>
        </div>
    )
}

export default DashboardStats