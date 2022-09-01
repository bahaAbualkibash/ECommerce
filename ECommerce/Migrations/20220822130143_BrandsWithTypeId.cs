using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ECommerce.Migrations
{
    public partial class BrandsWithTypeId : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ProductTypeId",
                table: "ProductBrands",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_ProductBrands_ProductTypeId",
                table: "ProductBrands",
                column: "ProductTypeId");

            migrationBuilder.AddForeignKey(
                name: "FK_ProductBrands_ProductTypes_ProductTypeId",
                table: "ProductBrands",
                column: "ProductTypeId",
                principalTable: "ProductTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.NoAction);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProductBrands_ProductTypes_ProductTypeId",
                table: "ProductBrands");

            migrationBuilder.DropIndex(
                name: "IX_ProductBrands_ProductTypeId",
                table: "ProductBrands");

            migrationBuilder.DropColumn(
                name: "ProductTypeId",
                table: "ProductBrands");
        }
    }
}
