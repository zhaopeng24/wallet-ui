import React from "react";
import { Card, CardHeader, CardBody, CardFooter, Avatar, Button } from "@nextui-org/react";
import Progress from "./Progress";
import DirectProgress from "./DirectProgress";
import { ExtraDataType } from "../active/page"
interface PropsType {
    UpdatedAt: string,
    extraData: ExtraDataType
}
export default function MyCard(Props: PropsType) {
    const [isFollowed, setIsFollowed] = React.useState(false);
    function formatIsoDateStringToCustomFormat(isoDate: string): string {
        const date = new Date(isoDate);
        // 使用Intl.DateTimeFormat进行格式化，指定时区和格式选项
        const formatter = new Intl.DateTimeFormat('en-US', {
            timeZone: 'UTC', // 这里设置为UTC，具体时区根据需要调整
            month: 'short', // "Jan", "Feb", "Mar", ...
            day: '2-digit', // "01", "02", ...
            year: 'numeric', // "2024"
            hour: '2-digit', // "14", "15", ...
            minute: '2-digit', // "23", "24", ...
            hour12: false // 使用24小时制
        });
        return formatter.format(date);
    }
    return (
        <Card className="max-w-[340px] bg-customBlue">
            <CardHeader className="relative">
                <div>{formatIsoDateStringToCustomFormat(Props.UpdatedAt)}</div>
                <div className="bg-green-500 absolute top-0 right-0 rounded-bl-lg p-2">Completed</div>
            </CardHeader>
            <CardBody className="px-3 py-0 text-small text-default-400 flex flex-col space-y-8">
                {/* <Progress /> */}
                <DirectProgress extraData={Props.extraData}/>
            </CardBody>
            <CardFooter className="gap-3">
                <div className="flex flex-row justify-between gap-x-10 w-full">
                    <div className="flex flex-grow justify-center ">
                        <Button
                            className={isFollowed ? "bg-transparent text-foreground border-default-200" : ""}
                            color="primary"
                            size="lg"
                            variant={isFollowed ? "bordered" : "solid"}
                            onPress={() => setIsFollowed(!isFollowed)}
                        >
                            View
                        </Button>
                    </div>
                    <div className="flex flex-grow justify-center ">
                        <Button radius="md" size="lg" className="bg-green-600 text-white shadow-lg">
                            Resend
                        </Button>
                    </div>


                </div>
            </CardFooter>
        </Card>
    );
}
