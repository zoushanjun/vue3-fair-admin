import {
  Layout,
  Breadcrumb,
  Menu,
  Button,
  Badge,
  Tabs,
  Input,
  Dropdown,
  Steps,
  Form,
  Divider,
  Select,
  Row,
  Radio,
  DatePicker,
  Col,
  Icon,
  Checkbox,
  Switch,
  Table,
  Drawer,
  Popconfirm,
  Tooltip,
  Space,
} from "ant-design-vue";
// import { Divider } from 'ant-design-vue/lib/vc-menu'

const ant = {
  install(Vue: any) {
    Vue.component(Layout.name, Layout);
    Vue.component(Layout.Sider.name, Layout.Sider);
    Vue.component(Layout.Header.name, Layout.Header);
    Vue.component(Layout.Footer.name, Layout.Footer);
    Vue.component(Layout.Content.name, Layout.Content);
    Vue.component(Breadcrumb.name, Breadcrumb);
    Vue.component(Breadcrumb.Item.name, Breadcrumb.Item);
    Vue.component(Menu.name, Menu);
    Vue.component(Menu.Item.name, Menu.Item);
    Vue.component(Divider.name, Divider);
    Vue.component(Button.name, Button);
    Vue.component(Table.name, Table);
    Vue.component(Tabs.name, Tabs);
    Vue.component(Tabs.TabPane.name, Tabs.TabPane);
    Vue.component(Input.name, Input);
    Vue.component(Input.Search.name, Input.Search);
    Vue.component(Input.Password.name, Input.Password);
    Vue.component(Input.TextArea.name, Input.TextArea);
    Vue.component(Badge.name, Badge);
    Vue.component(Dropdown.name, Dropdown);
    Vue.component(Steps.name, Steps);
    Vue.component(Space.name, Space);
    Vue.component(Form.name, Form);
    Vue.component(Form.Item.name, Form.Item);
    Vue.component(Select.name, Select);
    Vue.component(Select.Option.name, Select.Option);
    Vue.component(Selection.name, Selection);
    Vue.component(Row.name, Row);
    Vue.component(Radio.name, Radio);
    Vue.component(DatePicker.name, DatePicker);
    Vue.component(Col.name, Col);
    Vue.component(Icon.name, Icon);
    Vue.component(Checkbox.name, Checkbox);
    Vue.component(Switch.name, Switch);
    Vue.component(Drawer.name, Drawer);
    Vue.component(Popconfirm.name, Popconfirm);
    Vue.component(Tooltip.name, Tooltip);
    // 以后想引入什么就引入什么
  },
};
export default ant;
