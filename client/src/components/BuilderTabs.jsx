const BuilderTabs = ({ sections, activeSectionIndex, setActiveSectionIndex }) => {
    return (
        <div className="flex gap-2 overflow-x-auto pb-3">
            {sections.map((section, index) => {
                const Icon = section.icon;
                const isActive = activeSectionIndex === index;

                return (
                    <button
                        key={section.id}
                        type="button"
                        onClick={() => setActiveSectionIndex(index)}
                        className={`flex shrink-0 items-center gap-2 rounded-full px-3 py-2 text-sm transition ${isActive
                                ? "bg-green-500 text-white"
                                : "bg-slate-100 text-slate-600 hover:bg-green-50 hover:text-green-700"
                            }`}
                    >
                        <Icon className="h-4 w-4" />
                        {section.name}
                    </button>
                );
            })}
        </div>
    );
};

export default BuilderTabs;