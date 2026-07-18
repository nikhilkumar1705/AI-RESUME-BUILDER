import { ChevronLeft, ChevronRight } from "lucide-react";

const BuilderNavigation = ({
    activeSection,
    activeSectionIndex,
    sectionsLength,
    handlePrevious,
    handleNext,
}) => {
    return (
        <div className="mt-5 flex items-center justify-between">
            <button
                type="button"
                onClick={handlePrevious}
                disabled={activeSectionIndex === 0}
                className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
                <ChevronLeft className="h-4 w-4" />
                Previous
            </button>

            <p className="text-sm font-medium text-slate-700">
                {activeSection.name}
            </p>

            <button
                type="button"
                onClick={handleNext}
                disabled={activeSectionIndex === sectionsLength - 1}
                className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
                Next
                <ChevronRight className="h-4 w-4" />
            </button>
        </div>
    );
};

export default BuilderNavigation;