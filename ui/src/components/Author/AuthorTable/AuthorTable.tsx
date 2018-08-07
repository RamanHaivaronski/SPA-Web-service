import * as React from 'react';
import { Table, Button, Icon, Popconfirm, message, Input, Form, Modal} from 'antd';
import { Author } from '@redux/authors/types';
import { ColumnProps } from 'antd/lib/table';
import { AuthorsTableProps } from '@components/Author/AuthorTable/FilterableAuthorsTable';

const FormItem = Form.Item;

export default class AuthorTable extends React.PureComponent<AuthorsTableProps> {

    state = { 
      _id: "",     
      name: "",
      surname:"",
      dob: "",
      dod: "",
     
      validateStatusErrorName: undefined,
      validateStatusErrorSurname: undefined,
      validateStatusErrorLifetime: undefined,

      nameError: "",    
      surnameError: "",
      lifetimeError: "",
      
      visible: false,
      // minValue: "",
      // maxValue: "",

      // previewImage: '',
      // previewVisible: false,

      
      // checkedList: [''],
    };    
    
    handleCancel = () => this.setState({ previewVisible: false })
    
    handlePreview = () => {
      this.setState({
        previewVisible: true, 
      });
    }

    private readonly columns: ColumnProps<Author>[] = [ 
      {
        title: 'Name',
        dataIndex: 'name',           
        key: 'name',         
        render: (text, record) => <span>{record.name}</span>
      },      
      {
        title: 'Surname',
        dataIndex: 'surname',
        key: 'surname',
        render: (text, record) => <span>{record.surname}</span>
      },
      {
        title: 'Lifetime',
        dataIndex: 'lifetime',
        key: 'lifetime', 
        render: (text, record) => <span>{record.dob + "-" + record.dod}</span>
      },
      { width: 100,
        title: "Delete",                               
        render: (text, record) =>
        <div> 
          <Popconfirm title="Are you sure?" 
            //onConfirm={() => this.removeAuthor(record.key)}            
            onCancel={() => message.error('Cancel!')}
            okText="Yes"
            cancelText="No">
              <Button
                size="small"
                type="danger">                
                Delete
                <Icon type="warning" /> 
              </Button>              
          </Popconfirm>                              
        </div>
      },
      { width: 150,
        title: 'Edit',
        render: (text, record) => 
        <div>
            <Modal
                //onOk={() => this.editBook(record.key)}
                onCancel={() =>  this.setState({ visible: false })}
                visible={this.state.visible}  
                title="Edit">
              <Form className="login-form">
                <FormItem
                  label="Name"
                  validateStatus={this.state.validateStatusErrorName}
                  help={this.state.nameError}>
                  <Input
                    prefix={<Icon type="bars" />} 
                    placeholder="Edit the name"
                    value={this.state.name}
                    onChange={e => this.change(e)}
                    name="name"
                  />
                </FormItem>
                <FormItem
                  label="Surname"
                  validateStatus={this.state.validateStatusErrorSurname}
                  help={this.state.surnameError}>                    
                  <Input
                    prefix={<Icon type="bars" />}                      
                    placeholder="Edit the surname" 
                    value={this.state.surname}
                    onChange={e => this.change(e)}
                    name="surname"
                  />
                </FormItem>
                {/* <FormItem
                  label="Lifetime"
                  validateStatus={this.state.validateStatusErrorLifetime}
                  help={this.state.lifetimeError}>
                  <Input 
                    prefix={<Icon type="bars" />}
                    placeholder="Edit the lifetime"
                    type="date"  
                    value={this.state.lifetime}
                    onChange={e => this.change(e)}
                    name="lifetime"
                  /> 
                </FormItem>                                  */}
              </Form>
            </Modal>         
              <Button 
                size="small"
                onClick={() => this.startEdit(record)}>
                Edit
                <Icon type="edit" />
              </Button>          
        </div>
      }
    ]
    
    onChange = (checkedList: any) => { 
      this.setState({
        genre: checkedList,
        checkedList,
      });
    }

    // handleCostSort = (minValue: number, maxValue: number) => {
    //   const {        
    //     pagination,
    //     sortAllBooksByCost,
    //   } = this.props;  
    //   sortAllBooksByCost(minValue, maxValue, pagination);
    //   message.success('sorted!');      
    // };
    
    // handleReset(e: any) {
    //   const {
    //     pagination: {
    //       pageSize,
    //       current,
    //     },
    //     loadBooks,                
    //   } = this.props;  
    //   loadBooks({ pageSize, current });
    //   this.setState({
    //     checkedList: e.target.checked ? options : [],
    //   });  
    // };

    validate = () => {      
      let isError = false;
      if(this.state.name.length < 0 ) {
        isError = true;
        this.setState({
          nameError: "Please, enter the Name",
          validateStatusErrorName: "error"
        });
      }
  
      if(this.state.surname.length < 0) {
        isError = true;
        this.setState({
          authorError: "Please, enter the Surname",
          validateStatusErrorAuthor: "error"
        });
      } 
      return isError;
    };

    change = (e: any) => {
      this.setState({
          [e.target.name]: e.target.value        
      });
    };   
   
    startEdit = (record: Author) => {      
      this.setState({
        _id: record.key,
        name: record.name,
        author: record.surname,
        //lifetime: record.lifetime,
        visible: true
      });
    };

    defaultState = () => {
      this.setState({
        _id: "",
        name: "",
        surname: "",
        lifetime: "",        
        validateStatusErrorName: undefined,
        validateStatusErrorAuthor: undefined,
        validateStatusErrorLifetime: undefined,
        nameError: "",    
        authorError: "",
        lifetimeError: ""
      });
    };  

    // editAuthor = (_id: string) => {  

    //   const {        
    //     editAuthor
    //   } = this.props;

    //   this.defaultState;
    //   if(!this.validate()) {
    //     editAuthor(this.state._id, this.state.name, this.state.surname, this.state.lifetime);
    //     this.defaultState;
    //     this.state.visible = false;     
    //     message.success('Edited!');
    //   } 
    // };

    // removeAuthor = (_id: string) => {
    //   const {        
    //     removeAuthor
    //   } = this.props;  
    //   removeAuthor(_id);
    //   message.success('Deleted!');      
    // };

    
    
    // componentDidMount() {     
    //   const {
    //     loadBooks,                
    //   } = this.props;  
    //   loadBooks({ pageSize, current });
    // };
  
    handleTableChange = () => {
      const { loadAuthors} = this.props

      loadAuthors();      
    };   
  
    render() {
      const {
        loading,
        authors               
      } = this.props;
  
      return (
        <div>           
          <Table          
            bordered
            columns={this.columns}
            dataSource={authors}          
            loading={loading}
            size='small'
            style={{ width: 1100 }}
            onChange={this.handleTableChange}
          />
        </div>                
      )
    }
  }