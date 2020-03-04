import Dialog from 'rc-dialog'
import 'rc-dialog/assets/index.css'
import Select, { Option } from 'rc-select'
import 'rc-select/assets/index.less'
import React from 'react'
import './style.css'

interface InvestDialogProps {
  visible: boolean
  onClose: () => void
  onSelect?: (value: number) => void
}

const InvestDialog: React.FC<InvestDialogProps> = ({
  visible,
  onSelect,
  onClose,
}) => {
  const INVESTMENT_UNIT = 'ETH'
  const options = [1, 2, 4, 6, 8, 16]

  const [internalSelected, setInternalSelected] = React.useState(options[0])

  const handleChange = (value: number) => {
    setInternalSelected(value)
  }

  return (
    <Dialog
      className="invest-dialog"
      mask
      visible={visible}
      onClose={onClose}
      maskClosable={false}
    >
      <h3 className="invest-dialog-title">选择参与金额</h3>
      <Select
        value={internalSelected}
        onChange={handleChange}
        dropdownClassName="invest-dialog-select-dropdown"
        getPopupContainer={() =>
          document.querySelector('.invest-dialog') || document.body
        }
        menuItemSelectedIcon={null}
        inputIcon={<span className="select-input-arrow" />}
      >
        {options.map((option, index) => (
          <Option value={option} key={index}>
            {option} {INVESTMENT_UNIT}
          </Option>
        ))}
      </Select>
      <button
        className="button"
        onClick={onSelect?.bind(null, internalSelected)}
      >
        确定
      </button>
    </Dialog>
  )
}

export default InvestDialog
