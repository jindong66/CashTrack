import dayjs from "dayjs"
import './index.scss'
import { useDate } from "@/hooks/useDate"
import { DatePicker, NavBar } from "antd-mobile"
import classNames from "classnames"
import { useSelector } from "react-redux"
import { useEffect, useMemo, useState } from "react"
import _ from 'lodash'

const Year = () => {

    const { date, visible, onDateChange, onShowDate, onHideDate } = useDate()
    const selectedYear = date.get('year')

    const thisYear = dayjs().get('year')
    const maxMonth = thisYear === selectedYear ? dayjs().get('month') + 1 : 12

    // 按年做数据的分组
    const billList = useSelector(state => state.bill.billList)
    const yearGroup = useMemo(() => {
        // return出去计算之后的值
        return _.groupBy(billList, (item) => dayjs(item.date).format('YYYY'))
    }, [billList])
    console.log('年组件输出yearGroup：')
    console.log(yearGroup)

    const [currentYearList, setYearList] = useState([])

    // 年统计结果显示
    const yearResult = useMemo(() => {
        // 支出  /  收入  / 结余
        const pay = currentYearList.filter(item => item.type === 'pay').reduce((a, c) => a + c.money, 0)
        const income = currentYearList.filter(item => item.type === 'income').reduce((a, c) => a + c.money, 0)
        return {
            pay,
            income,
            total: pay + income
        }

    }, [currentYearList])
    console.log('年组件输出yearResult：')
    console.log(yearResult)

    // 初始化的时候把当前年的统计数据显示出来
    useEffect(() => {
        const nowDate = dayjs().format('YYYY')
        // 边界值控制
        if (yearGroup[nowDate]) {
            setYearList(yearGroup[nowDate])
        }
    }, [yearGroup])
    // END

    return (
        <div className="billDetail">
            <NavBar className="nav" backIcon={false}>
                <div className="nav-title" onClick={onShowDate}>
                    {selectedYear}年
                    <span className={classNames('arrow', visible && 'expand')}></span>
                </div>
            </NavBar>

            <div className="content">
                {/* 统计区域 */}
                <div className="overview">
                    <div className='twoLineOverview'>
                        <div className="item">
                            <span className="money">{yearResult.pay.toFixed(2)}</span>
                            <span className="type">支出</span>
                        </div>
                        <div className="item">
                            <span className="money">{yearResult.income.toFixed(2)}</span>
                            <span className="type">收入</span>
                        </div>
                        <div className="item">
                            <span className="money">{yearResult.total.toFixed(2)}</span>
                            <span className="type">结余</span>
                        </div>
                    </div>
                </div>

                {/* 单月列表统计 */}
            </div>

            {/**时间选择器 */}
            <DatePicker
                className="kaDate"
                title="记账日期"
                precision="year"
                visible={visible}
                onClose={onHideDate}
                max={new Date()}
                onConfirm={onDateChange}
            />

        </div>
    )
}

export default Year