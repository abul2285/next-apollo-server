import { SchemaDirectiveVisitor } from "apollo-server";
import { defaultFieldResolver } from "graphql";

class Decoration extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const decorateType = this.args.decoration;
    const originalResolve = field.resolve || defaultFieldResolver;

    field.resolve = async function (...args) {
      let result = await originalResolve.apply(this, args);

      if (decorateType === "upper") {
        return result.toUpperCase();
      } else if (decorateType === "lower") {
        return result.toLowerCase();
      } else if (decorateType === "capitalize") {
        return result
          .split(" ")
          .map((p) => p[0].toUpperCase() + p.substring(1))
          .join(" ");
      } else {
        return result;
      }
    };
  }
}

export default Decoration;
