import Slider, { Range, SliderTooltip } from "rc-slider";
import { useState } from "react";
import { useRouter } from "next/router";

const handle = (props) => {
  const { value, dragging, index, ...restProps } = props;
  const { Handle } = Slider;
  return (
    <SliderTooltip
      prefixCls="rc-slider-tooltip"
      overlay={`${value} ₽`}
      visible={dragging}
      placement="top"
      key={index}
    >
      <Handle value={value} {...restProps} />
    </SliderTooltip>
  );
};

const FilterElement = ({ price_min = 0, price_max = 0, specifications }) => {
  const router = useRouter();
  const query = router.query;

  const [select_price_min, setSelectPriceMin] = useState(
    query.price_min || price_min
  );
  const [select_price_max, setSelectPriceMax] = useState(
    query.price_max || price_max
  );

  const [select_specification, setSelectSpecification] = useState(
    query.specification || []
  );

  function handleFilter(e) {
    e.preventDefault();

    // console.log(select_specification);
    // const index = select_specification.indexOf(1);
    // const splice = select_specification.slice(2);
    // setSelectSpecification(splice);

    const path = router.pathname;
    const query = router.query;
    query.price_min = select_price_min;
    query.price_max = select_price_max;
    query.specification =
      select_specification.length > 0 ? select_specification.join(",") : [];
    router.push({
      pathname: path,
      query: query,
    });
  }

  function onChange(e) {
    console.log(select_specification.includes(e.target.value));
    if (select_specification.includes(e.target.value)) {
      var index = select_specification.indexOf(e.target.value);
      if (index !== -1) {
        select_specification.splice(index, 1);
      }
    } else {
      setSelectSpecification((select_specification) => [
        ...select_specification,
        e.target.value,
      ]);
    }

    console.log(select_specification);
    // if (select_specification.includes(e.target.value)) {
    //   select_specification.slice(select_specification.indexOf(e.target.value));
    // } else {
    //   setSelectSpecification((select_specification) => [
    //     ...select_specification,
    //     e.target.value,
    //   ]);
    // }
  }

  return (
    <>
      <form onSubmit={handleFilter}>
        <div className="border-bottom pb-4 mb-4">
          <h4>Цена</h4>

          <Range
            step={10}
            handle={handle}
            min={price_min}
            max={price_max}
            defaultValue={[select_price_min, select_price_max]}
            onChange={(value) => (
              setSelectPriceMin(value[0]), setSelectPriceMax(value[1])
            )}
            value={[select_price_min, select_price_max]}
          />

          {/* Range Slider */}

          <div className="d-flex justify-content-between mt-4">
            <input
              type="text"
              className="form-control form-control-sm max-w-13rem"
              name="price_min"
              value={select_price_min}
              onChange={(e) => setSelectPriceMin(e.target.value)}
              id="rangeSliderExample3MinResult"
            />
            <input
              type="text"
              className="form-control form-control-sm max-w-13rem mt-0"
              name="price_max"
              value={select_price_max}
              onChange={(e) => setSelectPriceMax(e.target.value)}
              id="rangeSliderExample3MaxResult"
            />
          </div>
          {/* End Range Slider */}
        </div>

        {specifications.map((specification) => (
          <div key={specification.id} className="border-bottom pb-4 mb-4">
            <h4>{specification.name}</h4>

            {/* for brand in brands */}
            {/* Checkboxes */}
            {specification.get_specification_value.map(
              (specification_value) => (
                <div
                  key={specification_value.id}
                  className="form-group d-flex align-items-center justify-content-between font-size-1 text-lh-lg text-body mb-1"
                >
                  <div className="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      name="brand"
                      value={specification_value.id}
                      defaultChecked={select_specification.includes(
                        specification_value.id
                      )}
                      onChange={onChange}
                      id={`characteristic-${specification_value.value}`}
                    />
                    <label
                      className="custom-control-label text-lh-lg"
                      htmlFor={`characteristic-${specification_value.value}`}
                    >
                      {specification_value.value}
                    </label>
                  </div>
                </div>
              )
            )}
            {/* End Checkboxes */}
            {/* endfor */}
          </div>
        ))}

        <button
          type="submit"
          className="btn btn-sm btn-block btn-soft-secondary transition-3d-hover"
        >
          Применить
        </button>
      </form>
    </>
  );
};

export default FilterElement;
