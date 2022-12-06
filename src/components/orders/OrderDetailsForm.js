import { useContext, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import AuthContext from "../../store/authContext";
import TextAreaInput from "../../UI/form/TextAreaInput";

const OrderDetailsForm = (props) => {
  const { register } = useForm();
  const authContext = useContext(AuthContext);
  const [dn, setDn] = useState(
    "deliveryNote" in props.order ? props.order.deliveryNote : ""
  );

  const onDnChange = (e) => {
    let dnTmp = e.target.value;
    setDn(dnTmp);
  };
  console.log("from OrderDetailsForm.js");
  console.log(props);
  const onOrderChange = async (task) => {
    try {
      const response = await fetch(
        `http://localhost:5000/orders/${props.order._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `BEARER ${authContext.token}`,
          },
          body: JSON.stringify(
            task === "update" ? { deliveryNote: dn } : { status: "canceled" }
          ),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw Error(data.error);
      }
      console.log(data);
    } catch (err) {
      console.log(err.message);
    }
  };

  const restOfBottomContent = () => {
    if (
      props.order.status !== "delivered" &&
      props.order.status !== "cancelled"
    ) {
      return (
        <>
          <TextAreaInput
            label="Delivery Note"
            name="deliveryNote"
            centerLabel={false}
            value={dn}
            onChange={onDnChange}
            register={register}
          />

          <div className="order-details-buttons">
            {"deliveryNote" in props.order &&
              props.order.deliveryNote !== dn && (
                <button
                  type="submit"
                  className="form-button"
                  onChange={() => onOrderChange("update")}
                >
                  Update Order
                </button>
              )}

            <button
              type="submit"
              className="form-button"
              onChange={() => onOrderChange("cancel")}
            >
              Cancel Order
            </button>
          </div>
        </>
      );
    } // create a static delivery note field (label) if order is delivered
    return (
      <>
        <label className="form-sublabel center-label">
          {" "}
          Delivery Note: {dn}{" "}
        </label>
      </>
    );
  };

  return (
    <form className="form">
      <div className="form-top">
        <div className="form-left">
          <div className="form-label-and-sublabel-col">
            <label className="form-label center-label">Product Name</label>
            <label className="form-sublabel center-label">
              {props.order.productName}
            </label>
          </div>

          <div className="form-label-and-sublabel-col">
            <label className="form-label center-label"> Quantity</label>
            <label className="form-sublabel center-label">
              {props.order.quantity}
            </label>
          </div>

          {"productSize" in props.order && (
            <div className="form-label-and-sublabel-col">
              <label className="form-label center-label">Chosen Size</label>
              <label className="form-sublabel center-label">
                {props.order.productSize}
              </label>
            </div>
          )}
        </div>
        <div className="form-right">
          <img
            src={props.order.imgUrl}
            alt={props.order.productName}
            width="300"
            className="product-img"
          />
        </div>
      </div>
      <div className="form-bottom">
        <div className="form-label-and-sublabel-row">
          <label className="form-label center-label">Order ID:</label>
          <label className="form-sublabel center-label">
            {props.order._id}
          </label>
        </div>

        <div className="form-label-and-sublabel-row">
          <label className="form-label center-label">Creation Date:</label>
          <label className="form-sublabel center-label">
            {props.order.date}, {props.order.time.toLowerCase()}
          </label>
        </div>

        <label
          name="totalPrice"
          className="form-label center-label"
        >{`Total Price: ${props.order.totalPrice} EGP`}</label>

        <div className="form-label-and-sublabel-row">
          <label className="form-label center-label">Status:</label>
          <label
            className="form-sublabel center-label"
            style={{
              color:
                props.order.status === "delivered"
                  ? "#15E915"
                  : props.order.status === "cancelled"
                  ? "#F81D1D"
                  : "white",
              fontWeight: "700",
            }}
          >
            {props.order.status}
          </label>
        </div>

        {restOfBottomContent()}
      </div>
    </form>
  );
};

export default OrderDetailsForm;