import root from "./root";
import main from "./main";
import scalar from "./scalar";
import enums from "./enum";
import unions from "./unions";
import interfaces from "./interfaces";
import directives from "./directives";
import dataScoures from "./datasources";
import upload from "./upload";
import subScription from "./subScription";
import mock from "./mock";
import authentication from "./authentication";
const schemaArray = [
  root,
  main,
  /*scalar, enums,
  unions, interfaces,
   directives, dataScoures, upload, subScription, mock,*/ authentication,
];

export default schemaArray;
