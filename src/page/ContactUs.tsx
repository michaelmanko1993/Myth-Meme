import { basic_url } from "@/stack/stack";
import { Form, Input, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";

const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};

const ContactUs = () => {

  const onFinish = (value: any) => {
    console.log(value.user, value.email, value.message);

    axios
      .post(
        `${basic_url}contact_us/${value.user}/${value.email}/${value.message}`,
      )
      .then(() => {
        message.success("Left Message Successfully.");
      })
      .catch(() => message.error("Network Error"));
  };

  return (
    <>
      <div className="contactus-bg rounded-b-3xl bg-[#0f0f0f]">
        <div className="container mx-auto">
          <h1 className="px-4 py-[40px] mt-[64px] md:py-[88px] font-inter text-[32px] md:text-[56px] font-bold leading-[40px] md:leading-[64px] text-white">
            Get In Touch
          </h1>
        </div>
      </div>
      <div className="container mx-auto">
        <div className="grid gap-6 px-4 md:px-16 py-[40px] md:py-[102px] grid-cols-1">
          
          <div className="space-y-4 md:space-y-6 rounded-xl bg-[#0F0F0F] border border-[#333333] p-4 md:p-6 font-spaceGrotesk text-[#FFFFFF]/90 w-full max-w-2xl mx-auto">
            <div className="">
              <h1 className="text-xl md:text-2xl font-medium text-white">
                Contact Us
              </h1>
            </div>
            <Form
              name="nest-messages"
              layout="vertical"
              labelWrap
              colon={false}
              onFinish={onFinish}
              className=""
              validateMessages={validateMessages}
            >
              <div className="flex w-full flex-col gap-4">
                <Form.Item
                  name={["user"]}
                  label={
                    <p
                      style={{
                        fontSize: "14px",
                        color: "#ffffff",
                        fontWeight: "600",
                        lineHeight: "20px",
                      }}
                    >
                      Name
                    </p>
                  }
                  rules={[{ required: true }]}
                  style={{ width: "100%" }}
                >
                  <Input
                    size="large"
                    placeholder="Full name"
                    className="h-12 rounded-md border border-[#333333] bg-[#0F0F0F] text-white placeholder:text-[#FFFFFF]/60"
                  />
                </Form.Item>
                <Form.Item
                  name={["email"]}
                  label={
                    <p
                      style={{
                        fontSize: "14px",
                        color: "#ffffff",
                        fontWeight: "600",
                        lineHeight: "20px",
                      }}
                    >
                      Email
                    </p>
                  }
                  rules={[{ type: "email", required: true }]}
                  style={{ width: "100%" }}
                >
                  <Input
                    size="large"
                    placeholder="Your email"
                    className="h-12 rounded-md border border-[#333333] bg-[#0F0F0F] text-white placeholder:text-[#FFFFFF]/60"
                  />
                </Form.Item>
              </div>
              <Form.Item
                name={["message"]}
                style={{ width: "100%" }}
                label={
                  <p
                    style={{
                      fontSize: "14px",
                      color: "#ffffff",
                      fontWeight: "600",
                      lineHeight: "20px",
                    }}
                  >
                    Message
                  </p>
                }
                rules={[{ required: true }]}
              >
                <TextArea
                  style={{ height: 120 }}
                  placeholder="Please enter your message ..."
                  className="rounded-md border border-[#333333] bg-[#0F0F0F] text-white placeholder:text-[#FFFFFF]/60"
                ></TextArea>
              </Form.Item>
              <Form.Item>
                <button
                  type="submit"
                  className="w-full md:w-auto min-w-[160px] bg-[#0F0F0F] border border-[#333333] hover:border-[#666666] rounded-md h-12 text-base text-white px-5 transition-colors"
                >
                  Send
                </button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
