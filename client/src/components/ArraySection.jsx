const ArraySection = ({
  title,
  buttonText,
  items = [],
  fields,
  onAdd,
  onChange,
  onRemove,
}) => {
  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
          <p className="mt-1 text-sm text-slate-500">
            Add your {title.toLowerCase()} details.
          </p>
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onAdd();
          }}
          className="rounded-lg bg-green-500 px-3 py-2 text-sm font-medium text-white hover:bg-green-600"
        >
          {buttonText}
        </button>
      </div>

      <div className="mt-5 space-y-4">
        {items.length === 0 && (
          <div className="rounded-xl border border-dashed border-slate-300 p-5 text-center text-sm text-slate-500">
            No {title.toLowerCase()} added yet.
          </div>
        )}

        {items.map((item, index) => (
          <div
            key={index}
            className="rounded-xl border border-slate-200 bg-slate-50 p-4"
          >
            <div className="space-y-3">
              {fields.map((field) =>
                field.type === "textarea" ? (
                  <textarea
                    key={field.key}
                    value={item[field.key] || ""}
                    onChange={(e) =>
                      onChange(index, field.key, e.target.value)
                    }
                    placeholder={field.placeholder}
                    rows={4}
                    className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
                  />
                ) : (
                  <input
                    key={field.key}
                    type={field.type || "text"}
                    value={item[field.key] || ""}
                    onChange={(e) =>
                      onChange(index, field.key, e.target.value)
                    }
                    placeholder={field.placeholder}
                    className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
                  />
                )
              )}
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onRemove(index);
              }}
              className="mt-3 text-sm font-medium text-red-500 hover:underline"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArraySection;